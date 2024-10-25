import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto{
    @ApiProperty()
    @IsEmail() // Ensure the email is valid
    @IsNotEmpty()
    name: string; // Add the email property

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
