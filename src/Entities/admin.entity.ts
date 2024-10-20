import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('admin')

export class adminEntity{
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty({description:'username'})
    @Column({type:'varchar', length:100, nullable:false, unique:true})
    @IsString({message:'first name can not contain symbols'})
    @IsNotEmpty({message:'first name cannot be empty'})
   
    email: string;

    @ApiProperty({description:'email of the user'})
    @Column({ unique: true })
    username:string;
   

    
    @ApiProperty({description:'users password'})
    @Column({type:'varchar', length:100, nullable:false, unique:true})
    @IsString({message:'first name can not contain symbols'})
    @IsNotEmpty({message:'first name cannot be empty'})
    password:string;


}