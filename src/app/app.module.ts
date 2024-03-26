import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { TransactionModule } from '../transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ProjectModule, UserModule, WalletModule, TransactionModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
