import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()

export class CartEntity{
    @ApiProperty({ description:'identifier'})
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty({description:'image of the item'})
    @Column()
    item:number

    @ApiProperty({description:'image of the item'})
    @Column()
    quantity:number

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

    @ManyToOne(()=>User, user=>user.cart)
    @ApiProperty({ description: 'User who owns the cart item' })
    user:User;

}