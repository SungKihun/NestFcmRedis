import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { FirebaseService } from './firebase/firebase.service';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly queueKey = 'fcm_queue';

  constructor(
    private readonly redisService: RedisService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async pushToQueue(data: { token: string; payload: any }) {
    await this.redisService.lpush(this.queueKey, JSON.stringify(data));
  }

  @Interval(500)
  async handleQueue() {
    const data = await this.redisService.rpop(this.queueKey);
    if (data) {
      const { token, payload } = JSON.parse(data);
      await this.firebaseService.sendNotification(token, payload);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
