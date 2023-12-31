import { beforeEach, describe, expect, it } from 'vitest';
import { DeletePatientUseCase } from './delete-patient';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let sut: DeletePatientUseCase;
let patientId: string;
let userId: string;
let patientRepository: PatientRepository;

describe('Delete Patient Use Case', () => {
	beforeEach(async () => {
		patientRepository = new InMemoryPatientsRepository();
		const userRepository = new InMemoryUsersRepository();
		sut = new DeletePatientUseCase(
			patientRepository,
			userRepository
		);

		const user = await userRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		userId = user.id;

		const { id } = await patientRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			age: 20,
			address: 'Rua 1',
			modality: 'Presencial',
			appointment_day: 'monday',
			appointment_from: '08:00',
			appointment_to: '09:00',
			user_id: user.id,
		});

		patientId = id;
	});

	it('should be able to delete a patient', async () => {
		await sut.execute({
			user_id: userId,
			patient_id: patientId,
		});

		const patient = await patientRepository.findById(patientId);

		expect(patient).toBeNull();
	});

	it('should not be able to delete a patient with invalid id', async () => {
		await expect(async () => {
			await sut.execute({
				user_id: userId,
				patient_id: 'invalid-id',
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete a patient if user is not the owner', async () => {
		await expect(async () => {
			await sut.execute({
				user_id: 'invalid-user-id',
				patient_id: patientId,
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
