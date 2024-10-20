import { ApiProperty } from "@nestjs/swagger"


export class pharmarcyDTO{
    id:number

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