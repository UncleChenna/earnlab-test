import { Controller } from '@nestjs/common';
``;

@Controller()
export class BaseController {
  async response({ message, data }: { message: string; data?: unknown }) {
    return {
      message,
      data,
    };
  }
}
