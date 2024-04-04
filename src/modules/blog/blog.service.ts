import {
	CACHE_MANAGER,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dtos/create-blog.dto';
import Blog from '../../database/entities/blog.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class BlogService {
	constructor(
		@InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
		@Inject(CACHE_MANAGER) private cacheService: Cache,
	) {}

	createBlog(blog: CreateBlogDto): Promise<Blog> {
		const newBlog = this.blogRepository.create(blog);
		return this.blogRepository.save(newBlog);
	}

	async findAllBlogs(
		page = 1,
		pageSize = 10,
	): Promise<{ data: Blog[]; totalCount: number; totalPages: number }> {
		let cached_data;

		cached_data = await this.cacheService.get(`blog-${page}-${pageSize}`);

		if (!cached_data) {
			const offset = (page - 1) * pageSize;

			const [data, totalCount] = await this.blogRepository.findAndCount({
				take: pageSize,
				skip: offset,
			});

			const totalPages = Math.ceil(totalCount / pageSize);

			if (data) {
				cached_data = await this.cacheService.set(`blog-${page}-${pageSize}`, {
					data,
					totalCount,
					totalPages,
				});

				return {
					data,
					totalCount,
					totalPages,
				};
			} else {
				throw new NotFoundException('Oops! there are no blog entries yet');
			}
		}

		return cached_data;
	}

	async viewBlog(id: string): Promise<Blog | string> {
		let cached_data;
		cached_data = await this.cacheService.get(id);

		if (!cached_data) {
			const blog = await this.blogRepository.findOne({
				where: { id: parseInt(id) },
			});

			if (blog) {
				cached_data = await this.cacheService.set(id, blog);
				return blog;
			} else {
				return 'blog does not exist';
			}
		}
		return cached_data;
	}
}
