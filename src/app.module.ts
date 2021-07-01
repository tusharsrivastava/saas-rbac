import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RbacModule } from './rbac/rbac.module';
import { AppConfig } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: AppConfig.validateConfig,
    }),
    TypeOrmModule.forRoot(AppConfig.getTypeOrmConfig()),
    RbacModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
