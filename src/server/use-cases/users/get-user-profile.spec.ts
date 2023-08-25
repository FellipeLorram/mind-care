import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let sut: GetUserProfileUseCase;
let userRepository: InMemoryUsersRepository;

describe('Get User Profile Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(userRepository);
	});

	it('should get user profile', async () => {
		const user = await userRepository.create({
			name: 'John Doe',
			email: 'johndoe.example.com',
		});

		const { user: userProfile } = await sut.execute({ userId: user.id });

		expect(userProfile).toEqual(user);
	});

	it('should not get user profile if user does not exists', async () => {
		await expect(sut.execute({ userId: 'invalid-user-id' })).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
