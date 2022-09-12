import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {join} from "path";
import { ServeStaticModule } from '@nestjs/serve-static'
import {AuthModule} from "./apps/auth/auth.module";
import {CoreModule} from "./apps/core/core.module";

@Module({
  imports: [CoreModule,AuthModule,ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client'),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
