import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [RedisService, AppService, FirebaseService],
  exports: [RedisService, FirebaseService],
})
export class AppModule {}
