import { Body, Controller, Get, Param, Post, Put,Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { marketListingDTO } from 'src/DTOs/marketListing.DTO';
import { marketEntity } from 'src/Entities/marketListing.Entitty';
import { MarketlistingService } from 'src/marketlisting/services/marketlisting/marketlisting.service';


@ApiTags('Market Items')
@Controller('marketlisting')
export class MarketlistingController {

  constructor(
    private readonly marketService:MarketlistingService
  ){ }
  
  @Post()
  @ApiBody({type:marketEntity})
  @ApiOperation({summary: 'create new market item'})
  @ApiResponse({status:201, description:'market listing created successifully'})

  createItem(@Body() market:marketEntity){
    return this.marketService.create(market)
  }
  @Get()
  @ApiOperation({summary:'retrieve all the market items'})
  @ApiResponse({status:204, description:'market listing retrieved successifully'})
  async getItems():Promise<marketListingDTO[]>{
    return this.marketService.findListing()
  }
  @Put(':id')
  @ApiParam({name: 'id', description:'the ID of the item', type:Number})
  @ApiOperation({summary:'update the market item'})
  @ApiBody({type:marketEntity})
  @ApiOperation({summary: 'create new market item'})
  @ApiResponse({status:204, description:'market listing created successifully'})
  updateItem(
    @Param('id') id:number,
    @Body() updateData:Partial<marketEntity>
  ):Promise<marketEntity>{
    return this.marketService.update(id, updateData);
  }
  @Delete(':id')
  @ApiOperation({summary: 'delete the listing'})
  @ApiParam({name:'id', description:'property deleted succesifully'})

  removeMarketListing(@Param('id') id:number){
    return this.marketService.remove(id)

  }
 

  



  


}
