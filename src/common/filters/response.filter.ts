import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { MESSAGES, logger } from '..';

//TODO: log error exceptions

// Restructure Response Object For Guard Exception
@Catch()
export class ResponseFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    //intercepting current execution pipeline to get details

    const ctx: HttpArgumentsHost = host.switchToHttp();

    const responseHttp: Response = ctx.getResponse();

    const requestPath: string = ctx.getRequest<Request>().url;

    const requestMethod: string = ctx.getRequest<Request>().method;

    //custom messages from message service module
    const customMessage: string = MESSAGES.INTERNAL_SERVER_ERROR;

    const status = false;

    //handling HTTP Exceptions
    if (exception instanceof HttpException) {
      //grabbing useful informations from excetion object
      const statusHttp: number = exception.getStatus();

      const response: any = exception.getResponse();

      const { message } = response;
      //preparing response status from status code
      //if error message is neither an array or string
      if (!Array.isArray(message) && typeof message !== 'string') {
        const newStatusHttp: number = HttpStatus.INTERNAL_SERVER_ERROR;

        responseHttp.status(newStatusHttp).json({
          status,
          message: [customMessage],
          requestPath,
          requestMethod,
        });
      }
      //error message is an array
      else if (Array.isArray(message)) {
        responseHttp.status(statusHttp).json({
          status,
          message,
          requestPath,
          requestMethod,
        });
      }
      //error message is a valid error object
      else {
        responseHttp.status(statusHttp).json({
          status,
          message: [message],
          // statusCode: statusHttp,
          requestPath,
          requestMethod,
          // stack: exception.stack,
        });
      }
    } else {
      // if error is not http cause - e.g mongoose error and other unhandled exceptions

      if (exception) {
        console.log(exception, 'exceptions');
        const modifiedException =
          typeof exception === 'string'
            ? (new Error(exception) as Error)
            : (exception as Error);

        logger.error(modifiedException.message, modifiedException.stack);
        logger.error(modifiedException);

        // await slack.sdk.send({
        //   text: `${displayName} Error (${process.env.NODE_ENV})\n\n\nMessage:\n${modifiedException.message}\n\nName:\n${modifiedException.name}\n\nStack:\n${modifiedException.stack}`,
        // });
      }

      const statusHttp: number = HttpStatus.INTERNAL_SERVER_ERROR;
      responseHttp.status(statusHttp).json({
        status,
        message: [customMessage],
        requestPath,
        requestMethod,
        // statusCode: statusHttp,
      });
    }
  }
}
