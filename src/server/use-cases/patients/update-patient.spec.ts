import { beforeEach, describe, expect, it } from 'vitest';
import { UpdatePatientUseCase } from './update-patient';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { type Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InvalidUserError } from '../errors/invalid-user-error';

let sut: UpdatePatientUseCase;
let patientRepository: InMemoryPatientsRepository;
let patient: Patient;
let userId: string;

describe('Update Patient Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		patientRepository = new InMemoryPatientsRepository();
		sut = new UpdatePatientUseCase(patientRepository);

		const user = await userRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		userId = user.id;

		patient = await patientRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			age: 20,
			appointment_duration: 30,
			address: 'Rua 1',
			appointment_time: new Date(),
			modality: 'Presencial',
			user_id: user.id,
		});
	});

	it('should be able to update patient', async () => {
		const { patient: p } = await sut.execute({
			userId,
			patientId: patient.id,
			data: {
				name: 'John Doe 2',
				age: 30,
				address: 'Rua 2',
			}
		});

		expect(p.age).toBe(30);
		expect(p.address).toBe('Rua 2');
		expect(p.name).toBe('John Doe 2');
		expect(p.id).toBe(patient.id);
	});

	it('should not be able to update patient if patient does not exists', async () => {
		await expect(() => sut.execute({
			userId,
			patientId: 'invalid-id',
			data: {
				name: 'John Doe 2',
				age: 30,
				address: 'Rua 2',
			}
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update patient if user is not the owner', async () => {
		await expect(() => sut.execute({
			userId: 'invalid-id',
			patientId: patient.id,
			data: {
				name: 'John Doe 2',
				age: 30,
				address: 'Rua 2',
			}
		})).rejects.toBeInstanceOf(InvalidUserError);
	});

	// it('should not be able update patient if user is not authenticated', () => {
	// 	expect(1).toBe(1);
	// });
});
