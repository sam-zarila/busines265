import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { isDate } from "util/types";

@Entity()
export class Orders{
    @PrimaryGeneratedColumn()
    ID:number;

    @Column({nullable:false,unique:true})
    @IsString({message:'order number must be a string'})
    OrderNumber:string;

    @Column({nullable:false})
    @IsString({message:'customer name must be a string'})
    CustomerName:string;



    @Column({nullable:false})
    @IsString({message:'product name must be a string'})
    ProductName:string;


    @Column({nullable:false})
    @IsNotEmpty({message:'price can not be empty'})
    @IsNumber()
    Price:number;

    @Column({nullable:false})
    @IsNotEmpty({message:'quantity can not be empty'})
    @IsNumber()
    Quantity:number;



    @Column({nullable:true})
    @IsString({message:'description must be a string'})
    Description:string;

  

    @Column({nullable:false})
    @IsString({message:'location must be a string'})
    Location:string;


    @Column({nullable:false})
    @IsString({message:'phone number must be astring'})
    PhoneNumber:string;

    
    @Column({nullable:false})
    
     OrderDate:Date;

}