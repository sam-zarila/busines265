import { ApiProperty } from "@nestjs/swagger"


export class addToCartDto{

  
    @ApiProperty({description:' item identifier'})
     item:number

     @ApiProperty({description:'quantity  of the items'})
     quantity:number

    @ApiProperty({description:'image of the item'})
    
    image:string
    
    @ApiProperty({description:'description of the item'})
    name:string

    @ApiProperty({description:'description of the item'})
    
    provider:string

    @ApiProperty({description:'price of the item'})
    
    price:string

    @ApiProperty({description:'image of the item'})
    

    location:string
  

}