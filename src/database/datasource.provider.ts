import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { config, setupConfig } from '../common/config';
import Blog from './entities/blog.entity';

setupConfig();

@Injectable()
export class DatabaseOptionsProvider implements TypeOrmOptionsFactory {
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: 'localhost',
			port: +config.DB_PORT,
			username: config.DB_USER,
			password: config.DB_PASSWORD,
			database: config.DB_NAME,
			synchronize: true,
			logging: false,
			entities: [Blog],
			migrations: ['./migrations/*.{ts,js}'],
		};
	}
}

export default DatabaseOptionsProvider;
