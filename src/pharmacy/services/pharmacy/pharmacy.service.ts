import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pharmarcyEntity } from 'src/Entities/pharmacy.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class PharmacyService {
    constructor(
        @InjectRepository(pharmarcyEntity) private  pharmarcyRepository:Repository<pharmarcyEntity>,
    ){}

    createPharmarcy(pharmacy:pharmarcyEntity){
        return this.pharmarcyRepository.create(pharmacy)
    }
    findPharmarcy():Promise<pharmarcyEntity[]>{

        return this.pharmarcyRepository.find()

    }
    async updatePharmacy(id:number, updateData:Partial<pharmarcyEntity>):Promise<pharmarcyEntity>{

        await  this.pharmarcyRepository.update(id,updateData)

        return this.pharmarcyRepository.findOneBy({id})

    }
    async removePharmacy(id:number):Promise<void>{

        await this.pharmarcyRepository.delete(id)

    }
}
