import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnggotaModule } from './anggota/anggota.module';

@Module({
  imports: [AnggotaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
