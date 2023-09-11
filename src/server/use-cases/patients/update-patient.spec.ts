import { beforeEach, describe, expect, it } from 'vitest';
import { UpdatePatientUseCase } from './update-patient';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { type Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';

let sut: UpdatePatientUseCase;
let patientRepository: InMemoryPatientsRepository;
let patient: Patient;
let userId: string;

describe('Update Patient Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		patientRepository = new InMemoryPatientsRepository();
		sut = new UpdatePatientUseCase(
			patientRepository,
			userRepository,
		);

		const user = await userRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		userId = user.id;

		patient = await patientRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			age: 20,
			address: 'Rua 1',
			modality: 'Presencial',
			user_id: user.id,
			appointment_day: 'monday',
			appointment_from: '08:00',
			appointment_to: '09:00',
		});
	});

	it('should be able to update patient', async () => {
		const { patient: p } = await sut.execute({
			userId,
			patientId: patient.id,
			name: 'John Doe 2',
			age: 30,
			address: 'Rua 2',

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
			name: 'John Doe 2',
			age: 30,
			address: 'Rua 2',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update patient if user is not the owner', async () => {
		await expect(() => sut.execute({
			userId: 'invalid-id',
			patientId: patient.id,
			name: 'John Doe 2',
			age: 30,
			address: 'Rua 2',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
