import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { adminEntity } from 'src/Entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import { Blacklist } from 'src/Entities/blacklist.entity';



@Injectable()
export class AdminService {
    private readonly saltRounds =10;
    private readonly jwtSecret ='sam123'


    constructor(
        @InjectRepository(adminEntity) private readonly adminRepository:Repository<adminEntity>,
        // @InjectRepository(Blacklist) private readonly blackRepository:Repository<Blacklist>
    ){}

    async createadmin(email:string, username:string, password:string){
        const hashedpassword =await bcrypt.hash(password , this.saltRounds)
        const admin = this.adminRepository.create({email,username,password:hashedpassword})

        return this.adminRepository.save(admin)

    }

    async Login(username:string, password:string){
        const admin =await this.adminRepository.findOne({where:{username}})
        if(!admin||!( await bcrypt.compare(password, admin.password))){
            throw new UnauthorizedException('iinvalid credentals')

        };
        const payload ={username:admin.username, sub:admin.id}
        return jwt.sign(payload, this.jwtSecret,{expiresIn:'1h'})


    }
    // async logout(token: string): Promise<void>{
    //     const decoded = jwt.verify(token, this.jwtSecret) as {exp:number};
    //     const expirateDate = new Date(decoded.exp*1000);
    //     const blacklistedToken = this.blackRepository.create({token, expirateDate});
    //     await this.blackRepository.save(blacklistedToken);

    // }
    // async isTokenBlacked(token:string): Promise<boolean>{
    //     const blacklistedToken = await this.blackRepository.findOne({where :{
    //         token
    //     }
      
    // })
    // return !!blacklistedToken;
    // }
}
