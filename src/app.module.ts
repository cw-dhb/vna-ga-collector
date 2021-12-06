import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppMiddleware } from './app.middlewares';
import { FileController } from './file.controller';

@Module({
  imports: [],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes(FileController);
  }
}
