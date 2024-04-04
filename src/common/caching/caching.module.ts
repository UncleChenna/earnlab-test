import { CacheModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
	imports: [
		CacheModule.registerAsync({
			isGlobal: true,
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				store: redisStore.create({
					url:
						configService.get<string>('NODE_ENV') === 'development'
							? configService.get<string>('REDIS_LOCAL_URL')
							: configService.get<string>('REDIS_DOCKER_URL'),
				}),
				ttl: 3600,
			}),
			inject: [ConfigService],
		}),
	],
})
export class CachingModule {}
