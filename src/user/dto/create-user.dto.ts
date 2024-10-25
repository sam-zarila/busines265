import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail() // Ensure the email is valid
    @IsNotEmpty()
    email: string; // Add the email property

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
