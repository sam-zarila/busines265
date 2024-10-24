import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "src/Entities/addToCart.Entity";
@Entity()
export class User {
    @ApiProperty({description:'identity'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({description:'unique name'}) 
    @Column({ unique: true })
    name: string;


    @ApiProperty({description:'email address'})
    @Column({ unique: true })
    email: string;

    @ApiProperty({description:'password'})
    @Column()
    password: string;

    @OneToMany(()=> CartEntity,(cart)=> cart.user)
    cart: CartEntity[];



}
