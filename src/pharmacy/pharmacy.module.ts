import { Module } from '@nestjs/common';
import { PharmacyController } from './controllers/pharmacy/pharmacy.controller';
import { PharmacyService } from './services/pharmacy/pharmacy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pharmarcyEntity } from 'src/Entities/pharmacy.Entity';

@Module({
  imports:[TypeOrmModule.forFeature([pharmarcyEntity])],
  controllers: [PharmacyController],
  providers: [PharmacyService]
})
export class PharmacyModule {}
