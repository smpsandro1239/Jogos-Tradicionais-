import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfig } from './config/env.config';
import { databaseConfig } from './config/database.config';
import { UtilizadoresModule } from './utilizadores/utilizadores.module';
import { AuthModule } from './auth/auth.module';
import { AldeiasModule } from './aldeias/aldeias.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    UtilizadoresModule,
    AuthModule,
    AldeiasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
