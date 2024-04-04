import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Query,
	UsePipes,
	ValidationPipe,
	UseInterceptors,
	CacheTTL,
	HttpException,
	HttpStatus,
	NotFoundException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import Blog from 'src/database/entities/blog.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('blog')
export class BlogController {
	constructor(private readonly blogService: BlogService) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(@Body() createBlogDto: CreateBlogDto) {
		const createdBlog = await this.blogService.createBlog(createBlogDto);
		return {
			message: 'Blog created successfully',
			data: createdBlog,
		};
	}

	@CacheTTL(300)
	@Get()
	async findAllBlogs(
		@Query('page') page = 1,
		@Query('limit') limit = 10,
	): Promise<{
		data: Blog[];
		totalCount: number;
		totalPages: number;
		message: string;
	}> {
		const { data, totalCount, totalPages } =
			await this.blogService.findAllBlogs(page, limit);

		if (!data) {
			throw new HttpException('Blog not found', HttpStatus.BAD_REQUEST);
		}

		return {
			message: 'Successfully retrieved all blogs',
			data,
			totalCount,
			totalPages,
		};
	}

	@CacheTTL(300)
	@Get(':id')
	async findOne(@Param('id') id: string) {
		const blog = await this.blogService.viewBlog(id);
		if (blog === 'blog does not exist') {
			throw new NotFoundException('blog does not exist');
		}
		return { data: blog };
	}
}
