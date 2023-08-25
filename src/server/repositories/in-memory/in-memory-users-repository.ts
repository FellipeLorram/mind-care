/* eslint-disable @typescript-eslint/require-await */
import { type Prisma, type User } from '@prisma/client';
import { type UserRepository } from '../user-repository';

export class InMemoryUsersRepository implements UserRepository {
	private users: User[];

	constructor() {
		this.users = [];
	}
	async create(data: Prisma.UserCreateInput) {
		const user: User = {
			...data,
			name: data.name ? data.name : null,
			emailVerified: data.emailVerified ? new Date(data.emailVerified) : null,
			email: data.email ? data.email : null,
			image: data.image ? data.image : null,
			id: String(this.users.length + 1),
		};
		
		this.users.push(user);

		return user;
	}

	async findByEmail(email: string) {
		const user = this.users.find((user) => user.email === email);
		return user ?? null;
	}

	async findById(id: string) {
		const user = this.users.find((user) => user.id === id);
		return user ?? null;
	}
} 