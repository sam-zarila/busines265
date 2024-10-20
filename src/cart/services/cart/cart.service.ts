import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addToCartDto } from 'src/DTOs/addToCart.DTO';
import { CartEntity } from 'src/Entities/addToCart.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity) private addTocartRepository:Repository<CartEntity>
    ){}

    async  addTocart(addToCart:addToCartDto) : Promise<{message:string}>{

        const {item,quantity,image,name,provider,price,location} = addToCart;
    
        console.log('adding to cart:',{item,quantity,image,name,provider,price,location});
    
        try {
    
          const existingItem = await this.addTocartRepository.findOne({where:{item}})

          if (existingItem) {
            existingItem.quantity +=quantity
            await this.addTocartRepository.save(existingItem);
            return {message:'Item quatinty updated in your cart'}
            
          }

          const newItem = this.addTocartRepository.create({item,quantity,image,name,provider,price,location})
          await this.addTocartRepository.save(newItem)
          
        } catch (error) {
            console.error('error adding items to cart:',error);
            throw new Error('could not add item to cart')
          
        }
    
      }
 async getCartItems():Promise<CartEntity[]>{
    try {

        const cartItems = await  this.addTocartRepository.find();
        return cartItems;
        
    } catch (error) {
        console.error('error fetching items from cart:',error);
        throw new Error('could not  fetch item from cart')
      
        
    }
 }

}
