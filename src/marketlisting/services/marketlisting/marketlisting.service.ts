import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { marketEntity } from 'src/Entities/marketListing.Entitty';
import { Repository } from 'typeorm';

@Injectable()
export class MarketlistingService {
   
    constructor(
        @InjectRepository(marketEntity) private  marketRepository:Repository<marketEntity>
    ){}

     create(marketEntity:marketEntity){

        return this.marketRepository.save(marketEntity)

    }
     findListing(): Promise<marketEntity[]>{

        return this.marketRepository.find()
    }
    async update(id: number, updateData:Partial<marketEntity>):Promise<marketEntity>{
        await this.marketRepository.update(id,updateData);
        return this.marketRepository.findOneBy({id})

    }
    async remove(id:number): Promise<void>{
        await this.marketRepository.delete(id)
    }

}
