import { Test, TestingModule } from '@nestjs/testing';
import { MarketlistingController } from './marketlisting.controller';

describe('MarketlistingController', () => {
  let controller: MarketlistingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketlistingController],
    }).compile();

    controller = module.get<MarketlistingController>(MarketlistingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
