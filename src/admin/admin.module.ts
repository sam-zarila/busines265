import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin/admin.controller';
import { AdminService } from './services/admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminEntity } from 'src/Entities/admin.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
  PassportModule,
  JwtModule.register({
    secret:'sam1234',
    signOptions:{expiresIn:'1h'}

  }),

    TypeOrmModule.forFeature([adminEntity])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
