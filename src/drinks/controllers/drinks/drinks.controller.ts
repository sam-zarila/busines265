import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DrinksService } from 'src/drinks/services/drinks/drinks.service';
import { drinksDTO } from 'src/DTOs/drinks.DTO';
import { drinksEntity } from 'src/Entities/drinks.Entity';


@ApiTags('Drinks Handler')
@Controller('drinks')
export class DrinksController {

    constructor(
        private readonly drinksService:DrinksService
    ){ }

    @Post()
    @ApiBody({type:drinksEntity})
    @ApiOperation({summary:'creating the drinks'})
    @ApiResponse({status:201, description:'drinks creates'})

    postDrink(@Body() drinksEntity:drinksEntity){

        return this.drinksService.createDrinks(drinksEntity)

    }

    @Get()
    @ApiOperation({summary:'creating the drinks'})
    @ApiResponse({status:201, description:'drinks creates'})

    getDrink():Promise<drinksDTO[]>{
        return this.drinksService.findDrinks()
    }
    
    @Put(':id')
    @ApiParam({name: 'id', description:'the ID of the item', type:Number})
    @ApiOperation({summary:'update the market item'})
    @ApiBody({type:drinksEntity})
    @ApiOperation({summary: 'create new market item'})
    @ApiResponse({status:204, description:'market listing created successifully'})
  
    updateItem(
      @Param('id') id:number,
      @Body() updateData:Partial<drinksEntity>
    ):Promise<drinksEntity>{
      return this.drinksService.updateDrinks(id, updateData);
  
  
    }
    @Delete(':id')
    @ApiOperation({summary: 'delete the listing'})
    @ApiParam({name:'id', description:'property deleted succesifully'})
  
    removeMarketListing(@Param('id') id:number){
      return this.drinksService.remove(id)
  
    }

    


    


}
