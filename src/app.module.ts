import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module'; // Adjust the import based on your folder structure
import { Orders } from './Entities/Order.Entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'business',
      entities: [Orders], 
      synchronize: true,
  //     logging: true,
  // logger: 'advanced-console',
    }),
    OrdersModule,
  ],
})
export class AppModule {}
