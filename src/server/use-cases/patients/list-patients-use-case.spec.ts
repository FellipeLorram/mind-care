import { beforeEach, describe, expect, it } from 'vitest';
import { ListPatientsUseCase } from './list-patients';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InavalidPageError } from '../errors/invalid-page-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let sut: ListPatientsUseCase;
let userId: string;

describe('List Patients Use Case', () => {
	beforeEach(async () => {
		const patientRepository = new InMemoryPatientsRepository();
		const usersRepository = new InMemoryUsersRepository();
		sut = new ListPatientsUseCase(
			patientRepository,
			usersRepository,
		);

		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		userId = user.id;

		for (let i = 0; i < 30; i++) {
			await patientRepository.create({
				user_id: userId,
				age: 10,
				name: 'john doe',
				modality: 'Presencial',
				appointment_day: 'monday',
				appointment_from: '08:00',
				appointment_to: '09:00',
			});
		}
	});

	it('should list all patients', async () => {
		const { patients, count } = await sut.execute({
			user_id: userId,
			page: 1,
			query: ''
		});

		expect(patients).toHaveLength(20);
		expect(count).toBe(30);
	});

	it('should list patients with pagination', async () => {
		const { patients } = await sut.execute({
			user_id: userId,
			page: 2,
			query: ''
		});

		expect(patients).toHaveLength(10);
	});

	it('should not be able to list patients with invalid page', async () => {
		await expect(() => sut.execute({
			user_id: userId,
			page: 0,
			query: ''
		})).rejects.toBeInstanceOf(InavalidPageError);
	});

	it('should not be able to list patients with invalid user', async () => {
		await expect(() => sut.execute({
			user_id: 'invalid-user',
			page: 1,
			query: '',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
