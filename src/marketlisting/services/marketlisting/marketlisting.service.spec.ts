import { Test, TestingModule } from '@nestjs/testing';
import { MarketlistingService } from './marketlisting.service';

describe('MarketlistingService', () => {
  let service: MarketlistingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketlistingService],
    }).compile();

    service = module.get<MarketlistingService>(MarketlistingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
