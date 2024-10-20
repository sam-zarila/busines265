import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from 'src/admin/services/admin/admin.service';
import { adminLoginDto } from 'src/DTOs/admin.login.DTO';
import { adminEntity } from 'src/Entities/admin.entity';

@ApiTags('Admin SignIn')
@Controller('admin')
export class AdminController {
 
     constructor( private readonly adminService:AdminService){}

     @Post('signup')
     @ApiBody({type:adminEntity})
     async signUp(
        @Body('email') email:string,
        @Body('username') username:string,
        @Body('password') password:string
     ){
        const admin = await this.adminService.createadmin(email, username, password)
        return(admin)
     }
     @Post('signIn' )
     @ApiOperation({ summary: 'logins the admin'})
     @ApiResponse({ status: 200, description: 'Login successful', schema: { example: { access_token: 'jwt_token' } } })
     async signup(
        @Body() adminLoginDto:adminLoginDto
     ){
        const accessToken = await this.adminService.Login(adminLoginDto.username, adminLoginDto.password)
        return{access_token:accessToken};
     }

   //   @Post('signout')
   //   @ApiOperation({ summary: 'logins the admin'})

   //   async signout(@Req() req:Request, @Res() res:Response){
   //    const token = req.headers.authorization?.split(' ')[1];

   //   }



}
