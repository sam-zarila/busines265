import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart/cart.controller';
import { CartService } from './services/cart/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/Entities/addToCart.Entity';

@Module({
  imports:[TypeOrmModule.forFeature([CartEntity])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {

  
}
