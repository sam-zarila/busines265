import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { marketEntity } from "src/Entities/marketListing.Entitty";
import { Repository } from "typeorm";


@Injectable()
export class RandomProductService {
  constructor(
    @InjectRepository(marketEntity)
    private readonly productRepository: Repository<marketEntity>
  ) {}

  // Fetch random products without a limit
  async getRandomProducts(): Promise<marketEntity[]> {
    return this.productRepository
      .createQueryBuilder("product")
      .orderBy("RANDOM()") // Randomly order products
      .getMany();
  }
}
