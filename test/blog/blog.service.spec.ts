import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from '../../src/modules/blog/blog.service';
import { CreateBlogDto } from '../../src/modules/blog/dtos/create-blog.dto';
import IBlog from '../../src/interfaces/blog.interface';
import { CacheModule } from '@nestjs/common';

describe('BlogService', () => {
	let service: BlogService;
	let mockBlogRepository: any;
	let mockCacheService: any;

	beforeEach(async () => {
		mockBlogRepository = {
			save: jest.fn(),
			findAndCount: jest.fn(),
			findOne: jest.fn(),
		};
		mockCacheService = {
			get: jest.fn(),
			set: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BlogService,
				{ provide: 'BlogRepository', useValue: mockBlogRepository },
				{ provide: 'CacheService', useValue: mockCacheService },
			],

			imports: [CacheModule.register()],
		}).compile();

		service = module.get<BlogService>(BlogService);
	});

	describe('createBlog', () => {
		it('should create a new blog', async () => {
			const createBlogDto: CreateBlogDto = {
				id: 1,
				author: 'John Doe',
				title: 'Test Blog',
				article: 'This is a test blog article.',
			};
			const newBlog: CreateBlogDto = {
				...createBlogDto,
				id: 1,
			};
			mockBlogRepository.save.mockResolvedValue(newBlog);

			const result = await service.createBlog(createBlogDto);

			expect(result).toEqual(newBlog);
			expect(mockBlogRepository.save).toHaveBeenCalledWith(createBlogDto);
		});
	});

	describe('findAllBlogs', () => {
		it('should find all blogs', async () => {
			const page = 1;
			const pageSize = 10;
			const data: IBlog[] = [
				{
					id: 1,
					author: 'John Doe',
					title: 'Test Blog',
					article: 'This is a test blog article.',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			];
			const totalCount = data.length;
			const totalPages = 1;
			mockCacheService.get.mockResolvedValue(null);
			mockBlogRepository.findAndCount.mockResolvedValue([data, totalCount]);

			const result = await service.findAllBlogs(page, pageSize);

			expect(result.data).toEqual(data);
			expect(result.totalCount).toBe(totalCount);
			expect(result.totalPages).toBe(totalPages);
		});
	});

	describe('viewBlog', () => {
		it('should view a blog', async () => {
			const id = '1';
			const blog: IBlog = {
				id: 1,
				author: 'John Doe',
				title: 'Test Blog',
				article: 'This is a test blog article.',
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			mockCacheService.get.mockResolvedValue(null);
			mockBlogRepository.findOne.mockResolvedValue(blog);

			const result = await service.viewBlog(id);

			expect(result).toEqual(blog);
		});

		it('should return "blog does not exist" if blog is not found', async () => {
			const id = '1';
			mockCacheService.get.mockResolvedValue(null);
			mockBlogRepository.findOne.mockResolvedValue(null);

			const result = await service.viewBlog(id);

			expect(result).toEqual('blog does not exist');
			expect(mockCacheService.set).not.toHaveBeenCalled();
		});

		it('should return "blog does not exist" if an error occurs', async () => {
			const id = '1';
			mockCacheService.get.mockRejectedValue(new Error('Test error'));

			const result = await service.viewBlog(id);

			expect(result).toEqual('blog does not exist');
		});
	});
});
