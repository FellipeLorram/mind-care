import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { GetPatientProfileUseCase } from './get-patient-profile';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';

let sut: GetPatientProfileUseCase;
let patientRepository: InMemoryPatientsRepository;
let userId: string;

describe('Get Patient Profile Use Case', () => {
	beforeEach(async () => {
		patientRepository = new InMemoryPatientsRepository();
		const userRepository = new InMemoryUsersRepository();
		sut = new GetPatientProfileUseCase(
			patientRepository,
			userRepository,
		);

		const user = await userRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
		});

		userId = user.id;
	});

	it('should be able to get patient profile', async () => {
		const patient = await patientRepository.create({
			name: 'any_name',
			age: 10,
			modality: 'any_modality',
			address: 'any_address',
			observation: 'any_observation',
			birthDate: new Date(),
			email: 'any_email@email.com',
			gender: 'male',
			nationality: 'any_nationality',
			appointment_duration: 10,
			appointment_time: new Date(),
			user_id: userId,
		});


		const { patient: patientProfile } = await sut.execute({ 
			patientId: patient.id,
			userId
		});

		expect(patientProfile).toEqual(patient);
	});

	it('should not get patient profile if patient does not exists', async () => {
		await expect(sut.execute({ 
			patientId: 'invalid-patient-id',
			userId: 'any_user_id'
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not get patient profile if user does not exists', async () => {
		await expect(sut.execute({
			patientId: 'any_patient_id',
			userId: 'invalid-user-id'
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
