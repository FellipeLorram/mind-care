import { type Prisma } from '@prisma/client';
import { type UserRepository } from '../user-repository';
import { prisma } from '@/server/db';

export class PrismaUserRepository implements UserRepository {
	findById(id: string) {
		const user = prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}
}
