import { Module } from '@nestjs/common';
import { DatabaseOptionsProvider } from './datasource.provider';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: DatabaseOptionsProvider,
		}),
	],

	providers: [],
})
export class DatabaseModule {}
