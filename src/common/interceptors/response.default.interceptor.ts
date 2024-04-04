import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// This interceptor for restructure response success
export class ResponseDefaultInterceptor
	implements NestInterceptor<Promise<any>>
{
	async intercept(
		_: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<Promise<any> | string>> {
		//preparing response from current execution  context
		// const ctx: HttpArgumentsHost = context.switchToHttp();

		// const _ = ctx.getResponse<Response>();

		// const requestExpress = ctx.getRequest<Request>().method;

		return next.handle().pipe(
			map(async (response: Promise<{ message: string; data: unknown }>) => {
				//handle status message dependinng on response code
				const status = true;

				// gettin response Payload
				const { message, data, ...rest } = await response;

				//prepare response and return
				return {
					status,
					message: [message] || ['Request Successful'],
					data,
					payload: rest,
				};
			}),
		);
	}
}
