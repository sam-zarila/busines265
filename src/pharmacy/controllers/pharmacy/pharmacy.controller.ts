import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { pharmarcyDTO } from 'src/DTOs/pharmacy.DTO';
import { pharmarcyEntity } from 'src/Entities/pharmacy.Entity';
import { PharmacyService } from 'src/pharmacy/services/pharmacy/pharmacy.service';


@ApiTags('Pharmarcy Handler')
@Controller('pharmacy')
export class PharmacyController {

    constructor(
        private readonly pharmarcyService:PharmacyService
    ){ }

    @Post()
    @ApiBody({type:pharmarcyEntity})
    @ApiOperation({summary:'pharmacy post made'})
    @ApiResponse({status:201, description:'created'})

    postPharmacy(@Body() pharmarcyEntity:pharmarcyEntity){

        return this.pharmarcyService.createPharmarcy(pharmarcyEntity)

    }
    @Get()
    @ApiOperation({summary:'creating the drinks'})
    @ApiResponse({status:201, description:'drinks creates'})

    getDrink():Promise<pharmarcyDTO[]>{
        return this.pharmarcyService.findPharmarcy()
    }

    @Put(':id')
    @ApiParam({name: 'id', description:'the ID of the item', type:Number})
    @ApiOperation({summary:'update the market item'})
    @ApiBody({type:pharmarcyEntity})
    @ApiOperation({summary: 'create new market item'})
    @ApiResponse({status:204, description:'market listing created successifully'})
    updatePharmarcy(
        @Param(':id') id:number,
        @Body() updateData:Partial<pharmarcyEntity>
    ):Promise<pharmarcyEntity>{
        return this.pharmarcyService.updatePharmacy(id,updateData)
        
    }
    @Delete()
    @ApiOperation({summary: 'delete the pharmarcy'})
    @ApiParam({name:'id', description:'property deleted succesifully'})

    removePharmarcy(@Param() id:number){
        return this.pharmarcyService.removePharmacy(id)

    }
  




}
