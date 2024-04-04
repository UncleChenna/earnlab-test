import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Query,
	UsePipes,
	ValidationPipe,
	CacheTTL,
	HttpException,
	HttpStatus,
	NotFoundException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import Blog from 'src/database/entities/blog.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
	constructor(private readonly blogService: BlogService) {}

	@ApiOperation({
		summary: 'Create new blog',
		description: 'Creates a blog post',
	})
	@ApiResponse({
		status: 201,
		description: 'Returns the created blog post',
	})
	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(@Body() createBlogDto: CreateBlogDto) {
		const createdBlog = await this.blogService.createBlog(createBlogDto);
		return {
			message: 'Blog created successfully',
			data: createdBlog,
		};
	}

	@ApiOperation({
		summary: 'View all blog posts',
		description: 'This API will return all blog posts',
	})
	@ApiResponse({
		status: 200,
		description: 'Returns the blog posts',
	})
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

	@ApiOperation({
		summary: 'View a blog posts',
		description:
			'This API will return the requested blog post, id is the unique key',
	})
	@ApiResponse({
		status: 200,
		description: 'Returns the requested blog post',
	})
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
