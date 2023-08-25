import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { GetPatientProfileUseCase } from './get-patient-profile';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';

let sut: GetPatientProfileUseCase;
let patientRepository: InMemoryPatientsRepository;

describe('Get Patient Profile Use Case', () => {
	beforeEach(() => {
		patientRepository = new InMemoryPatientsRepository();
		sut = new GetPatientProfileUseCase(patientRepository);
	});

	it('should be able to get patient profile', async () => {
		const userRepository = new InMemoryUsersRepository();
		const user = await userRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
		});

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
			user_id: user.id
		});


		const { patient: patientProfile } = await sut.execute({ patientId: patient.id });

		expect(patientProfile).toEqual(patient);
	});

	it('should not get patient profile if patient does not exists', async () => {
		await expect(sut.execute({ patientId: 'invalid-patient-id' })).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
