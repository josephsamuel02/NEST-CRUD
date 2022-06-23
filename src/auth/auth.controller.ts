import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthSignUpDto } from "./dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }


    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }


    @HttpCode(HttpStatus.OK)
    @Post('signin')
    siginin(@Body() dto: AuthSignUpDto) {
        return this.authService.signin(dto)
    }
};