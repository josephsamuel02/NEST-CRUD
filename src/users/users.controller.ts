import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '@prisma/client';


//  @UseGuards(AuthGuard('jwt')) the position of the guard determines where the jwt token is verified
// in this instance it serves all routes starting with '/users/urls..'

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  // the AuthGuard passes the jwt token in the request header to @nestjs/passport.
  //then the jwt token is provided by PassportStrategy and extracted by ExtractJwt.fromAuthHeaderAsBearerToken().
  // check jwt.strategy.ts to find my deffinations.

  // @UseGuards(AuthGuard('jwt')) --- if its placed in this position it only serves for this single rquest route
  @HttpCode(HttpStatus.OK)
  @Get('me')
  getUser(@Req() req: Request) {
    return req.user;

  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  updateUser(
    @Param('id') userId: number,
    @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(userId, dto)
  }


  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteUser(
    @Param('id') userId: number) {
    return this.usersService.deleteUser(userId)
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
