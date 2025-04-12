import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  let port = configService.get<number>('PORT', 3001);

  try {
    await app.listen(port);
    console.log(`App running at http://localhost:${port}`);
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      port += 1;
      await app.listen(port);
      console.log(`Port was in use, switched to http://localhost:${port}`);
    } else {
      throw err;
    }
  }

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  // await app.listen(3005);
  await app.listen(port);
  console.log(`App running at http://localhost:${port}`);

}
bootstrap().catch((err) => {
  console.log(err);
});
