import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { displayName } from '../package.json';
import { AppModule } from './app.module';
import { logger } from './common';
import { config, setupConfig } from './common/config';
import { ResponseFilter } from './common/filters/response.filter';
import { ResponseDefaultInterceptor } from './common/interceptors/response.default.interceptor';

async function bootstrap() {
	const error = await setupConfig();
	if (error) return logger.error(error);

	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.useGlobalFilters(new ResponseFilter());
	app.useGlobalInterceptors(new ResponseDefaultInterceptor());

	// app.use(
	//   session({
	//     secret: config.SESSION_SECRET,
	//     resave: false,
	//     saveUninitialized: false,
	//   }),
	// );

	if (config.NODE_ENV !== 'production') {
		const swaggerConfig = new DocumentBuilder()
			.setTitle(`${displayName} API Reference`)
			.addBearerAuth({ type: 'http' }, 'jwt')
			.build();
		SwaggerModule.setup(
			'/api/documentation',
			app,
			SwaggerModule.createDocument(app, swaggerConfig),
		);
	}

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	await app.listen(config.PORT);

	const link = config.BASE_URL;

	const docLink = `${link}:${config.PORT}/api/documentation`;

	logger.debug(`${displayName} is running on: ${link}:${config.PORT}`);
	if (config.NODE_ENV !== 'production')
		logger.debug(`Swagger documentation: ${docLink}`);
}
bootstrap();
