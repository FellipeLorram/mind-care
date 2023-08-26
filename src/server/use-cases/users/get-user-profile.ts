import { type UserRepository } from '@/server/repositories/user-repository';
import { type User } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { z } from 'zod';

export const GetUserProfileUseCaseRequest = z.object({
	userId: z.string(),
});

type GetUserProfileUseCaseRequestType = z.infer<typeof GetUserProfileUseCaseRequest>;

interface GetUserProfileUseCaseResponse {
	user: User;
}

export class GetUserProfileUseCase {
	constructor(private userRepository: UserRepository) { }

	async execute({ userId }: GetUserProfileUseCaseRequestType): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return {
			user
		};
	}
}
