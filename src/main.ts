import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


 

// Load environment variables from .env file
config();
  // Configure Swagger
  const options = new DocumentBuilder()
    .setTitle('Business is Business API') 
    .setDescription('API for managing orders') 
    .setVersion('1.0') 
    .build();

  const document = SwaggerModule.createDocument(app, options); 
  SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT || 3000); // Use PORT from .env, or default to 3000

}
bootstrap();
