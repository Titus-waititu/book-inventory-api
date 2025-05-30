import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { BookReview } from 'src/bookreviews/entities/bookreview.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([User,Profile,BookReview])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
