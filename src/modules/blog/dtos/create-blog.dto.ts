import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateBlogDto {
	@IsInt()
	id: number;

	@IsString()
	@Transform(({ value }) => value.trim())
	author: string;

	@IsString()
	@Transform(({ value }) => value.trim())
	title: string;

	@IsString()
	@Transform(({ value }) => value.trim())
	article: string;
}
