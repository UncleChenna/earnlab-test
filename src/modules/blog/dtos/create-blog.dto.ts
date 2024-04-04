import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateBlogDto {
	@ApiProperty({ required: true })
	@IsInt()
	id: number;

	@ApiProperty({ required: true })
	@IsString()
	@Transform(({ value }) => value.trim())
	author: string;

	@ApiProperty({ required: true })
	@IsString()
	@Transform(({ value }) => value.trim())
	title: string;

	@ApiProperty({ required: true })
	@IsString()
	@Transform(({ value }) => value.trim())
	article: string;
}
