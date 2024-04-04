import { Transform, plainToInstance } from 'class-transformer';
import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	validateSync,
} from 'class-validator';
import { config as dotenvConfig } from 'dotenv';

class Config {
	@IsString()
	DB_URL: string;

	@IsNotEmpty()
	@IsString()
	NODE_ENV: string;

	@Transform(({ value }) => JSON.parse(value))
	@IsOptional()
	@IsBoolean()
	EMPTY_DB = false;

	@Transform(({ value }) => JSON.parse(value))
	@IsOptional()
	@IsBoolean()
	DB_SSL = false;

	@IsNotEmpty()
	@IsString()
	SESSION_SECRET: string;

	@IsNotEmpty()
	@IsString()
	DB_NAME: string;

	@IsNotEmpty()
	@IsString()
	DB_USER: string;

	@IsNotEmpty()
	@IsString()
	DB_PASSWORD: string;

	@IsNotEmpty()
	@IsString()
	DB_PORT: string;

	@IsNotEmpty()
	@IsString()
	JWT_SECRET: string;

	@IsNotEmpty()
	@IsString()
	BASE_URL: string;

	@Transform(({ value }) => JSON.parse(value))
	@IsOptional()
	@IsNumber()
	PORT = 8080;

	@IsNotEmpty()
	@IsString()
	REDIS_CLOUD: string;
}

export let config: Config;

export const setupConfig = () => {
	dotenvConfig();
	config = plainToInstance(Config, process.env);
	const [error] = validateSync(config, { whitelist: true });
	if (error) return error;
};
