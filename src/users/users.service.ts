import { HttpCode, Injectable } from '@nestjs/common';
import { Http2ServerResponse } from 'http2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async updateUser(userId: number, dto: UpdateUserDto) {

    const user = await this.prisma.user.update({
      where: { id: Number(userId) },
      data: {
        ...dto
      }
    })

    delete user.hash;
    return user;

  }

  async deleteUser(userId: number) {
    const user = await this.prisma.user.delete({
      where: { id: Number(userId) },
    })


    return {
      message: 'user is deleted successfully'
    }

  }




  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
