
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/update-user.dto';


@ApiTags('user registration')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @ApiBody({ type: CreateUserDto }) // Use DTO for validation
    async Register(@Body() createUserDto: CreateUserDto) {
        const { name, email, password } = createUserDto; // Destructure DTO
        const user = await this.userService.createUser(name, email, password);
        return user;
    }

    @Post('login')
    async Login(@Body() createUserDto: LoginUserDto) {
        const accessToken = await this.userService.SignIn(createUserDto.name, createUserDto.password);
        return { access_token: accessToken };
    }
}
