import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ResponseHeader } from './response.interceptor';
import { AuthGuard } from './auth.guard';

async function bootstrap() {
  // implement https with self sign certificate to endpoints
  const httpsOptions = {
    key: fs.readFileSync('secrets/key.pem', 'utf8'),
    cert: fs.readFileSync('secrets/cert.pem', 'utf8'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions, cors: true });
  // set global jwt verify and response header 
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new ResponseHeader());
  await app.listen(3000);
}
bootstrap();
