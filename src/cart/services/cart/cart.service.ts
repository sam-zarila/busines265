import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { addToCartDto } from 'src/DTOs/addToCart.DTO';
import { CartEntity } from 'src/Entities/addToCart.Entity';
import { User } from '../../../user/entities/user.entity';  // Import the User entity

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity) private addTocartRepository: Repository<CartEntity>,
    @InjectRepository(User) private userRepository: Repository<User>,  // Inject the UserRepository
  ) {}

  // Adding an item to the cart
  async addTocart(addToCart: addToCartDto): Promise<{ message: string }> {
    const { item, quantity, image, name, provider, price, location, userId } = addToCart;

    console.log('Adding to cart:', { item, quantity, image, name, provider, price, location, userId });

    try {
      // Find the user by their ID (from the frontend)
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        console.error(`User not found for ID: ${userId}`);
        throw new NotFoundException('User not found');
      }

      // Check if the item already exists in the user's cart
      const existingItem = await this.addTocartRepository.findOne({
        where: { item, user: { id: userId } },
      });

      if (existingItem) {
        existingItem.quantity += quantity;
        await this.addTocartRepository.save(existingItem);
        return { message: 'Item quantity updated in your cart' };
      }

      // Create a new cart item and associate it with the user
      const newItem = this.addTocartRepository.create({
        item,
        quantity,
        image,
        name,
        provider,
        price,
        location,
        user,
      });
      await this.addTocartRepository.save(newItem);

      return { message: 'Item added to cart' };
    } catch (error) {
      console.error('Error adding items to cart:', error);
      throw new Error('Could not add item to cart');
    }
  }

  // Fetching cart items for a specific user
  async getCartItems(userId: number): Promise<CartEntity[]> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['cart'] });
      if (!user) {
        console.error(`User not found for ID: ${userId}`);
        throw new NotFoundException('User not found');
      }

      return user.cart;  // Return the user's cart items
    } catch (error) {
      console.error('Error fetching items from cart:', error);
      throw new Error('Could not fetch items from cart');
    }
  }
}
