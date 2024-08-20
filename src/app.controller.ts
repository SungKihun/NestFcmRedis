import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sendFcm')
  async sendFcm(@Body('token') token: string, @Body('payload') payload: any) {
    await this.appService.pushToQueue({ token, payload });
  }

}
