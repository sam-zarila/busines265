import { ApiProperty } from '@nestjs/swagger';

export class addToCartDto {
  @ApiProperty({ description: 'Item identifier' })
  item: number;

  @ApiProperty({ description: 'Quantity of the item' })
  quantity: number;

  @ApiProperty({ description: 'Image of the item' })
  image: string;

  @ApiProperty({ description: 'Name of the item' })
  name: string;

  @ApiProperty({ description: 'Provider of the item' })
  provider: string;

  @ApiProperty({ description: 'Price of the item' })
  price: string;

  @ApiProperty({ description: 'Location of the item' })
  location: string;

  @ApiProperty({ description: 'User ID to link the cart item' })
  userId: number; }
