import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Blog {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	author: string;

	@Column()
	title: string;

	@Column()
	article: string;

	@CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@UpdateDateColumn({
		name: 'updated_at',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;
}
