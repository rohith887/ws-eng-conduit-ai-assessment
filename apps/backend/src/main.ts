import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, { cors: true });
  const startServer = async () => {
    let port = 3000;
    const maxPort = 3010;

    const checkPort = (port: number): Promise<boolean> => {
      return new Promise((resolve) => {
        const tester = require('net').createServer()
          .once('error', (err: any) => (err.code === 'EADDRINUSE' ? resolve(false) : resolve(true)))
          .once('listening', () => tester.once('close', () => resolve(true)).close())
          .listen(port);
      });
    };

    while (port <= maxPort) {
      const isPortFree = await checkPort(port);
      if (isPortFree) {
        try {
          await app.listen(port);
          console.log(`App running at http://localhost:${port}`);
          break;
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Failed to start server on port ${port}:`, error.message);
          } else {
            console.error(`Failed to start server on port ${port}:`, error);
          }
          process.exit(1);
        }
      } else {
        console.log(`Port ${port} is in use, trying next port...`);
        port++;
      }
    }

    if (port > maxPort) {
      console.error(`No available ports found between 3000 and ${maxPort}.`);
      process.exit(1);
    }
  };

  await startServer();

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
