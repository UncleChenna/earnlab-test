import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CachingModule } from './common/caching';
import { DatabaseModule } from './database/database.module';
import { BlogModule } from './modules/blog/blog.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		BlogModule,
		CachingModule,
	],
	providers: [],
})
export class AppModule {}
