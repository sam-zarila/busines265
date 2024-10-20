import { Module } from '@nestjs/common';
import { BakeryController } from './controllers/bakery/bakery.controller';
import { BakeryService } from './services/bakery/bakery.service';

@Module({
  controllers: [BakeryController],
  providers: [BakeryService]
})
export class BakeryModule {}
