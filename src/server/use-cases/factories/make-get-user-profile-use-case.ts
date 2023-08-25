import { PrismaUserRepository } from '@/server/repositories/prisma/prisma-user-repository';
import { GetUserProfileUseCase } from '../users/get-user-profile';

export function MakeGetUserProfileUseCase() {
	return new GetUserProfileUseCase(
		new PrismaUserRepository(),
	);
}