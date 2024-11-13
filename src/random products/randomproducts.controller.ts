import { Controller, Get } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RandomProductService } from "./randomproducts.services";
import { marketEntity } from "src/Entities/marketListing.Entitty";


@Controller("randomproducts")
@ApiTags("Random Products")
export class RandomController {
  constructor(private readonly randomProductService: RandomProductService) {}

  // Endpoint to get random products
  @Get('getallproductsrandomly')

  @ApiOperation({summary:'random product retrieved made'})
  @ApiResponse({status:201, description:'retrieved'})

  async getRandomProducts(): Promise<marketEntity[]> {
    return this.randomProductService.getRandomProducts();
  }
}

