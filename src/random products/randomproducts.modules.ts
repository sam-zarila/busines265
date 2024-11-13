import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { marketEntity } from "src/Entities/marketListing.Entitty";
import { RandomController } from "./randomproducts.controller";
import { RandomProductService } from "./randomproducts.services";


@Module({
    imports:[TypeOrmModule.forFeature([marketEntity])],
    controllers:[RandomController],
    providers:[RandomProductService]

})
export class randomproductsModule{}


