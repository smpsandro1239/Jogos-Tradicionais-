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
import { EventosModule } from './eventos/eventos.module';
import { JogosModule } from './jogos/jogos.module';
import { ParticipacoesModule } from './participacoes/participacoes.module';
import { SorteiosModule } from './sorteios/sorteios.module';
import { AuditoriaModule } from './auditoria/auditoria.module';

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
    EventosModule,
    JogosModule,
    ParticipacoesModule,
    SorteiosModule,
    AuditoriaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
