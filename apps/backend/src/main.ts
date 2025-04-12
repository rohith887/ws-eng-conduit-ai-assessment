import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  let port = configService.get<number>('PORT', 3001);

  const startServer = async (port: number) => {
    const app = await NestFactory.create(AppModule, { cors: true });
    try {
      await app.listen(port);
      console.log(`App running at http://localhost:${port}`);

      const options = new DocumentBuilder()
        .setTitle('NestJS Realworld Example App')
        .setDescription('The Realworld API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('/docs', app, document);
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use, trying next port...`);
        await app.close();
        await startServer(port + 1);
      } else {
        throw error;
      }
    }
  };

  await startServer(port);
}
bootstrap().catch((err) => {
  console.log(err);
});
