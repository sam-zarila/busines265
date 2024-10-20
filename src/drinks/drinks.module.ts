import { Module } from '@nestjs/common';
import { DrinksController } from './controllers/drinks/drinks.controller';
import { DrinksService } from './services/drinks/drinks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { drinksEntity } from 'src/Entities/drinks.Entity';

@Module({

  imports:[TypeOrmModule.forFeature([drinksEntity])],
  controllers: [DrinksController],
  providers: [DrinksService]
})
export class DrinksModule {}
