import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module'; // Adjust the import based on your folder structure
import { Orders } from './Entities/Order.Entity';
import { Admin } from 'typeorm';
import { CartEntity } from './Entities/addToCart.Entity';
import { drinksEntity } from './Entities/drinks.Entity';
import { pharmarcyEntity } from './Entities/pharmacy.Entity';
import { marketEntity } from './Entities/marketListing.Entitty';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { DrinksModule } from './drinks/drinks.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { MarketlistingModule } from './marketlisting/marketlisting.module';

// Log environment variables for debugging
console.log('DATABASE_URL:', process.env.DATABASE_URL);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host:'localhost',
      // port:5432,
      // database:'business',
      // password:'1234',
      // username:'postgres',

       url: 'postgres://qdjkkngz:oB8xjyAQIR9WsqmZiGlf808y8oH819c0@raja.db.elephantsql.com/qdjkkngz', // Full connection URL
      entities: [Orders,Admin,CartEntity,drinksEntity,pharmarcyEntity,marketEntity],
      synchronize: true,  // Set to false in production to prevent unwanted schema changes
    }),
    
    OrdersModule,
    AdminModule,
    CartModule,
    DrinksModule,
    PharmacyModule,
    MarketlistingModule,
  ],
})
export class AppModule {}
