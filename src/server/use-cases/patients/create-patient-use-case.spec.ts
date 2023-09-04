import { describe, it, expect, beforeEach } from 'vitest';
import { CreatePatientUseCase } from './create-patient';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InavalidAppointmentDurationError } from '../errors/invalid-appointment-duration-error';
import { InavalidAppointmentDayError } from '../errors/invalid-appointment-day-error';

let sut: CreatePatientUseCase;
let patientRepository: PatientRepository;
let userRepository: UserRepository;

let userId: string;

describe('Patient Use Case', () => {
	beforeEach(async () => {
		patientRepository = new InMemoryPatientsRepository();
		userRepository = new InMemoryUsersRepository();
		sut = new CreatePatientUseCase(patientRepository, userRepository);

		const user = await userRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
		});

		userId = user.id;
	});

	it('should be able to create a patient', async () => {
		const { patient } = await sut.execute({
			name: 'any_name',
			age: 10,
			modality: 'any_modality',
			address: 'any_address',
			observation: 'any_observation',
			birthDate: new Date(),
			email: 'any_email@email.com',
			gender: 'male',
			nationality: 'any_nationality',
			appointment_from: '10:00',
			appointment_to: '10:45',
			appointment_day: 'monday',
			userId,
		});

		expect(patient).toBeTruthy();
	});

	it('should not be able to create a patient with invalid user id', async () => {
		await expect(() => sut.execute({
			name: 'any_name',
			age: 10,
			modality: 'any_modality',
			address: 'any_address',
			observation: 'any_observation',
			birthDate: new Date(),
			email: 'any_email@email.com',
			gender: 'male',
			nationality: 'any_nationality',
			appointment_from: '10:00',
			appointment_to: '10:45',
			appointment_day: 'monday',
			userId: 'any_user_id'
		})).rejects.toBeInstanceOf(Error);
	});

	it('should not be able to create a patient with invalid appointment time', async () => {
		await expect(() => sut.execute({
			name: 'any_name',
			age: 10,
			modality: 'any_modality',
			address: 'any_address',
			observation: 'any_observation',
			birthDate: new Date(),
			email: 'any_email@email.com',
			gender: 'male',
			nationality: 'any_nationality',
			appointment_from: '10:00',
			appointment_to: '10:00',
			appointment_day: 'monday',
			userId,
		})).rejects.toBeInstanceOf(InavalidAppointmentDurationError);
	});

	it('should not be able to create a patient with invalid appointment day', async () => {
		await expect(() => sut.execute({
			name: 'any_name',
			age: 10,
			modality: 'any_modality',
			address: 'any_address',
			observation: 'any_observation',
			birthDate: new Date(),
			email: 'any_email@email.com',
			gender: 'male',
			nationality: 'any_nationality',
			appointment_from: '10:00',
			appointment_to: '10:40',
			appointment_day: 'invalid_day',
			userId,
		})).rejects.toBeInstanceOf(InavalidAppointmentDayError);
	});			


});
