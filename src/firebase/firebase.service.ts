import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  /*constructor() {
    // 실행 환경에 따라 경로 설정
    const isProduction = process.env.NODE_ENV === 'production';
    const serviceAccountPath = isProduction
      ? path.join(__dirname, '../firebase/firebase.config.json')
      : path.join(__dirname, '../src/firebase/firebase.config.json');

    // 파일을 동기적으로 읽어와서 JSON 파싱
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

    // Firebase 초기화
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }*/

  constructor(private configService: ConfigService) {
    const serviceAccount = JSON.parse(this.configService.get<string>('FIREBASE_SERVICE_ACCOUNT'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async sendNotification(token: string, payload: admin.messaging.MessagingPayload) {
    try {
      await admin.messaging().sendToDevice(token, payload);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
