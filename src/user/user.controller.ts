import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user registration')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({type: User})

   async Register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
   ){

    const user = await this.userService.createUser(name, email, password);
    return (user);
   }

   @Post('login')
   @ApiOperation({ summary: 'logins the admin'})
   @ApiResponse({ status: 200, description: 'Login successful', schema: { example: { access_token: 'jwt_token' } } })
     async Login(
      @Body() CreateUserDto:CreateUserDto
     ){

      const accessToken = await this.userService.SignIn(CreateUserDto.name, CreateUserDto.password);
    return {access_token: accessToken};
      
     }
}
