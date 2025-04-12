import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = 3000;

  try {
    await app.listen(port);
    console.log(`App running at http://localhost:${port}`);
  } catch (error) {
    console.error(`Failed to start server on port ${port}:`, error.message);
    process.exit(1);
  }
  console.log(`App running at http://localhost:${port}`);

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}
bootstrap().catch((err) => {
  console.log(err);
});
