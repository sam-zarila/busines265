import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module'; // Adjust the import based on your folder structure
import { Orders } from './Entities/Order.Entity';

// Log environment variables for debugging
console.log('DATABASE_URL:', process.env.DATABASE_URL);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://qdjkkngz:oB8xjyAQIR9WsqmZiGlf808y8oH819c0@raja.db.elephantsql.com/qdjkkngz', // Full connection URL
      entities: [Orders],
      synchronize: true,  // Set to false in production to prevent unwanted schema changes
    }),
    
    OrdersModule,
  ],
})
export class AppModule {}
