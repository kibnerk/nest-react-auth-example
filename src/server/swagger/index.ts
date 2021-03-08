import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function initSwagger(app: INestApplication): Promise<void> {
  const documentOptions = new DocumentBuilder()
    .setTitle('Auth test API')
    .setDescription('Auth API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api/doc', app, document);
}
