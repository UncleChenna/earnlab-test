import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('BlogController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	it('should create a blog', () => {
		return request(app.getHttpServer())
			.post('/blog')
			.send({
				id: 1,
				author: 'John Doe',
				title: 'Test Blog',
				article: 'This is a test blog article.',
			})
			.expect(201)
			.expect((res) => {
				expect(res.body.message).toBe('Blog created successfully');
				expect(res.body.data).toHaveProperty('id');
				expect(res.body.data.author).toBe('John Doe');
				expect(res.body.data.title).toBe('Test Blog');
				expect(res.body.data.article).toBe('This is a test blog article.');
			});
	});

	it('should retrieve all blogs', () => {
		return request(app.getHttpServer())
			.get('/blog')
			.expect(200)
			.expect((res) => {
				expect(res.body.message).toBe('Successfully retrieved all blogs');
				expect(res.body.data).toBeInstanceOf(Array);
				expect(res.body.data.length).toBeGreaterThan(0);
				expect(res.body.totalCount).toBeDefined();
				expect(res.body.totalPages).toBeDefined();
			});
	});

	it('should retrieve a single blog', async () => {
		const response = await request(app.getHttpServer()).get('/blog');
		const blogId = response.body.data[0].id.toString();

		return request(app.getHttpServer())
			.get(`/blog/${blogId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.data).toBeDefined();
				expect(res.body.data).toHaveProperty('author');
			});
	});

	it('should return message for non-existent blog', () => {
		const nonExistentBlogId = '1023';

		return request(app.getHttpServer())
			.get(`/blog/${nonExistentBlogId}`)
			.expect(404)
			.expect((res) => {
				expect(res.body.message).toBe('blog does not exist');
			});
	});
});
