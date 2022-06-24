import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthSignUpDto, AuthDto } from "./dto";
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthSignUpDto) {
        //generate the password hash
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({

                data: {
                    email: dto.email,
                    name: dto.name,
                    hash: hash,
                    surname: dto.surname,
                    phone: dto.phone,
                },

                // select: {
                //     id: true,
                //     email: true,
                //     name: true,
                //     surname: true,
                //     createdAt: true,
                //     phone: true,

                // }
            });



            // return a signed user token
            return this.signToken(user.id, user.email);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {

                // handle error for duplicate fields
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'user allredy exist'
                    )
                }

                throw error
            }
        }


    };

    async signin(dto: AuthDto) {


        // find user by email
        const userSignin = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        // find user by phone
        // const phoneuserSignin = await this.prisma.user.findUnique({
        //     where: {
        //         phone: dto.phone
        //     }
        // })





        // if user not found throw exception
        if (!userSignin) { throw new ForbiddenException('Wrong Credientials') };



        //compare password
        const passmatch = await argon.verify(
            userSignin.hash,
            dto.password
        );

        if (!passmatch) {
            throw new ForbiddenException('Wrong Credientials')
        };
        // to hide hashed pass from returned object
        // delete userSignin.hash;




        // return a signed user token
        return this.signToken(userSignin.id, userSignin.email)
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        };

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '5m',
                secret: this.config.get('JWT_SECRET')
            }
        );

        return {
            access_token: token
        }
    }

}