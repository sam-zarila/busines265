import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from 'src/cart/services/cart/cart.service';
import { addToCartDto } from 'src/DTOs/addToCart.DTO';
import { CartEntity } from 'src/Entities/addToCart.Entity';

@ApiTags('Cart Management')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addTocart(@Body() addTocart: addToCartDto) {
    try {
      const result = await this.cartService.addTocart(addTocart);
      return result;
    } catch (error) {
      console.error('Error adding to cart:', error); // Log the error for debugging
      throw new HttpException('Could not add item to cart', HttpStatus.BAD_REQUEST);
    }
  }

  // Get cart items for a specific user by userId
  @Get(':userId')
  async getCartItems(@Param('userId') userId: number): Promise<CartEntity[]> {
    try {
      const cartItems = await this.cartService.getCartItems(userId);
      return cartItems;
    } catch (error) {
      console.error('Error fetching cart items:', error); // Log the error for debugging
      throw new HttpException('Could not fetch cart items', HttpStatus.BAD_REQUEST);
    }
  }
}
