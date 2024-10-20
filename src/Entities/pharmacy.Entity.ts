import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class pharmarcyEntity{
    @ApiProperty({ description:'identifier'})
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty({description:'image of the item'})
        @Column({type:'text'})
     image:string

    @ApiProperty({description:'image of the item'})
    @Column({type:'text'})
    name:string

    

    @ApiProperty({description:'description of the item'})
    @Column({type:'text'})
    provider:string

    @ApiProperty({description:'price of the item'})
    @Column({type:'varchar', length:255})
    price:string

    @ApiProperty({description:'image of the item'})
    @Column({type:'varchar', length:255})

    location:string
}