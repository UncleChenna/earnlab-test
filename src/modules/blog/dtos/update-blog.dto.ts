import { IsInt, IsString } from 'class-validator';

export class UpdateBlogDto {
	@IsInt()
	id: number;

	@IsString()
	author: string;

	@IsString()
	title: string;

	@IsString()
	article: string;
}
