import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class  CreateOrderDto{
    ID:number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()

    
 OrderNumber:string;
 @IsNotEmpty()
 @IsString()
 @ApiProperty()
    CustomerName:string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    ProductName:string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    Price:number;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    Quantity:number;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    Description:string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    Location:string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    PhoneNumber:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    OrderDate:Date;


}


export class UpdateOrderDto{
    OrderNumber:string;
    CustomerName:string;
    ProductName:string;
    Price:number;
    Quantity:number;
    Description:string;
    Location:string;
    PhoneNumber:string;
    OrderDate:Date;


}






export class selectedDateDTO {
    @IsDateString()
    date: string;
  }