import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Blog from './entities/Blog.entity';

@Injectable()
export class DatabaseSeeder {
	constructor(
		@InjectRepository(Blog)
		private readonly blogRepository: Repository<Blog>,
	) {}

	public async seed() {
		console.log('Seeding database');
		await this.seedBlogs();
		console.log('Database seeded 🌱');
	}

	public async seedBlogs() {
		const existingBlogs = await this.blogRepository.find();
		if (existingBlogs.length < 10) {
			const newBlogs: Partial<Blog>[] = [];
			for (let i = 0; i < 100; i++) {
				newBlogs.push({
					author: 'Admin',
					title: `Example Title ${i + 1}`,
					article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			}
			await this.blogRepository.save(newBlogs);
		}
	}
}
