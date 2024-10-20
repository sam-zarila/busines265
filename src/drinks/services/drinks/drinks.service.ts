import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { drinksEntity } from 'src/Entities/drinks.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class DrinksService {


    constructor(
        @InjectRepository(drinksEntity) private drinksRepository:Repository<drinksEntity>
    ){}


    createDrinks(drinksEntity:drinksEntity){

        return this.drinksRepository.save(drinksEntity)
        
    }
    findDrinks():Promise<drinksEntity[]>{
        return this.drinksRepository.find()

    }
  async  updateDrinks(id:number, updateData:Partial<drinksEntity>):Promise<drinksEntity>{

      await this.drinksRepository.update(id,updateData)

      return this.drinksRepository.findOneBy({id})


    }

    async remove(id:number):Promise<void>{
        await this.drinksRepository.delete(id)

    }
}
