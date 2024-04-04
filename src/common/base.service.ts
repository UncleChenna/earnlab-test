import { HttpStatus, Injectable } from '@nestjs/common';
import { logger } from '.';
@Injectable()
export class BaseService {
	async handleError(error: Error) {
		logger.error(error);

		return {
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: [process.env.DEBUG ? error.message : 'Internal server error'],
		};
	}

	public async ReportError(error: Error) {
		logger.error(error);
	}

	protected HandleError(error: Error, report = false) {
		// this.ReportError(error);
		if (report) {
			this.ReportError(error);
		}

		return {
			errMessage: error.message || 'Internal server error',
			isError: true,
			data: null,
			error,
		};
	}

	protected Results<T>(data?: T): any {
		return {
			data: data as T,
			isError: false,
			errMessage: undefined,
		};
	}
}
