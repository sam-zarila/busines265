import { Module } from '@nestjs/common';
import { MarketlistingController } from './controllers/marketlisting/marketlisting.controller';
import { MarketlistingService } from './services/marketlisting/marketlisting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { marketEntity } from 'src/Entities/marketListing.Entitty';

@Module({
  imports:[

    TypeOrmModule.forFeature([marketEntity])
  ],
  controllers: [MarketlistingController],
  providers: [MarketlistingService]
})
export class MarketlistingModule {}
