import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = 3000;

  const checkPort = (port: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const tester = require('net').createServer()
        .once('error', (err: any) => (err.code === 'EADDRINUSE' ? resolve(false) : resolve(true)))
        .once('listening', () => tester.once('close', () => resolve(true)).close())
        .listen(port);
    });
  };

  const isPortFree = await checkPort(port);

  if (!isPortFree) {
    console.error(`Port ${port} is already in use. Please free the port and try again.`);
    process.exit(1);
  }

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
}
bootstrap().catch((error: any) => {
  console.error('Error during bootstrap:', error);
});
