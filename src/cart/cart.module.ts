import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart/cart.controller';
import { CartService } from './services/cart/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/Entities/addToCart.Entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CartEntity,User])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {

  
}
