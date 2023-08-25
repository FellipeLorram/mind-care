import { beforeEach, describe, expect, it } from 'vitest';
import { CreateAppointmentUseCase } from './create-appointment';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let sut: CreateAppointmentUseCase;
let userId: string;
let anotherUserId: string;
let patientId: string;

describe('Create Appointment Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const appointmentRepository = new InMemoryAppointmentsRepository();
		sut = new CreateAppointmentUseCase(
			patientRepository,
			userRepository,
			appointmentRepository,
		);

		const user = await userRepository.create({
			name: 'any_name',
			email: 'any_email@email.com',
		});

		const anotherUser = await userRepository.create({
			name: 'any_name',
			email: 'another@email.com',
		});

		const patient = await patientRepository.create({
			user_id: user.id,
			age: 10,
			name: 'john doe',
			appointment_duration: 30,
			appointment_time: new Date(),
			modality: 'Presencial'
		});

		userId = user.id;
		patientId = patient.id;
		anotherUserId = anotherUser.id;
	});

	it('should create a new appointment', async () => {
		const appointment = await sut.execute({
			patientId,
			userId,
			date: new Date(),
		});

		expect(appointment).toBeDefined();
	});

	it('should not be able create a new appointment with invalid user', async () => {
		await expect(() => sut.execute({
			patientId,
			userId: 'invalid_user_id',
			date: new Date(),
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('Shoult not be able to create a new appointment if the user is not the patients owner', async () => {
		await expect(() => sut.execute({
			patientId,
			userId: anotherUserId,
			date: new Date(),
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able create a new appointment with invalid patient', async () => {
		await expect(() => sut.execute({
			patientId: 'invalid_patient_id',
			userId,
			date: new Date(),
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
