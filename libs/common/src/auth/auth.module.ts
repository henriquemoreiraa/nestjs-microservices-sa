import { Module } from '@nestjs/common';
import { RmqModule } from '../rmq/rmq.module';
import { AUTH_SERVICE } from '../constants/services';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  exports: [RmqModule],
})
export class AuthModule {}
