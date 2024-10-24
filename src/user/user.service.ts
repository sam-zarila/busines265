import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';



@Injectable()
export class UserService {
  private readonly saltRounds=10;
  private readonly jwwSecret='sam265'

  constructor(
    @InjectRepository(User) private readonly  UserRepository:Repository<User>
  ){  }

    async createUser(name:string, email:string,password:string){

      const hashedPassword = await bcrypt.hash(password, this.saltRounds);
      const newUser = this.UserRepository.create({name, email, password: hashedPassword});
      return await this.UserRepository.save(newUser);
    }

    async SignIn(name:string, password:string){
      const newUser = await this .UserRepository.findOne({where:{name}})

      if (!newUser ||!(await bcrypt.compare(password, newUser.password))) {

        throw new Error('Invalid Credentials')
        
      };
    }
 
}
