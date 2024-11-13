import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module'; // Adjust the import based on your folder structure
import { Orders } from './Entities/Order.Entity';
import { adminEntity } from './Entities/admin.entity';
import { CartEntity } from './Entities/addToCart.Entity';
import { drinksEntity } from './Entities/drinks.Entity';
import { pharmarcyEntity } from './Entities/pharmacy.Entity';
import { marketEntity } from './Entities/marketListing.Entitty';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { DrinksModule } from './drinks/drinks.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { MarketlistingModule } from './marketlisting/marketlisting.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { randomproductsModule } from './random products/randomproducts.modules';


// Log environment variables for debugging
// console.log('DATABASE_URL:', process.env.DATABASE_URL);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host:'localhost',
      // port:3306,
      // database:'business',
      // password:'',
      // username:'root',

       url: 'postgres://rdqygkjn:XP6Vuzl6v4c6khn-61FKZ3tha57dGMyS@stampy.db.elephantsql.com/rdqygkjn', // Full connection URL
      entities: [Orders,adminEntity,CartEntity,drinksEntity,pharmarcyEntity,marketEntity,User],
      synchronize: true,  // Set to false in production to prevent unwanted schema changes
    }),
    
    OrdersModule,
    AdminModule,
    CartModule,
    DrinksModule,
    PharmacyModule,
    MarketlistingModule,
    UserModule,
    randomproductsModule,
  ],
})
export class AppModule {}
