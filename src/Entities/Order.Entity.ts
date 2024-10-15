import { IsNotEmpty, IsNumber, IsString, IsDate } from "class-validator";  // Import IsDate for OrderDate validation
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ nullable: false, unique: true })
    @IsString({ message: 'Order number must be a string' })
    OrderNumber: string;

    @Column({ nullable: false })
    @IsString({ message: 'Customer name must be a string' })
    CustomerName: string;

    @Column({ nullable: false })
    @IsString({ message: 'Product name must be a string' })
    ProductName: string;

    @Column({ type: 'decimal', nullable: false })  // Specify the type correctly
    @IsNotEmpty({ message: 'Price cannot be empty' })
    @IsNumber({}, { message: 'Price must be a number' })  // Add empty object to IsNumber for proper validation
    Price: number;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Quantity cannot be empty' })
    @IsNumber({}, { message: 'Quantity must be a number' })  // Add empty object to IsNumber for proper validation
    Quantity: number;

    @Column({ nullable: true })
    @IsString({ message: 'Description must be a string' })
    Description?: string;  // Optional field

    @Column({ nullable: false })
    @IsString({ message: 'Location must be a string' })
    Location: string;

    @Column({ nullable: false })
    @IsString({ message: 'Phone number must be a string' })
    PhoneNumber: string;

    @Column({ type: 'timestamp', nullable: false })  // Specify the type for OrderDate
    @IsNotEmpty({ message: 'Order date cannot be empty' })
    @IsDate({ message: 'Order date must be a valid date' })  // Validate date format
    OrderDate: Date;
}
