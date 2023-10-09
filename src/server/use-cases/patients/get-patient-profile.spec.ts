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
			birth_date: new Date(),
			email: 'any_email@email.com',
			phones: {
				create: [
					{
						number: 'any_phone_number',
						refers_to: 'any_phone_refers_to',
					}
				]
			},
			gender: 'male',
			nationality: 'any_nationality',
			appointment_day: 'monday',
			appointment_from: '10:00',
			appointment_to: '10:45',
			user_id: userId,
		});


		const { patient: patientProfile } = await sut.execute({ 
			patient_id: patient.id,
			user_id: userId,
		});

		expect(patientProfile).toBeTruthy();
		expect(patientProfile.id).toBe(patient.id);
		expect(patientProfile.name).toBe(patient.name);
		expect(patientProfile.age).toBe(patient.age);
		expect(patientProfile.modality).toBe(patient.modality);
	});

	it('should not get patient profile if patient does not exists', async () => {
		await expect(sut.execute({ 
			patient_id: 'invalid-patient-id',
			user_id: 'any_user_id'
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not get patient profile if user does not exists', async () => {
		await expect(sut.execute({
			patient_id: 'any_patient_id',
			user_id: 'invalid-user-id'
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
