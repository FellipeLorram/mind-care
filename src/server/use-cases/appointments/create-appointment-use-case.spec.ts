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
			modality: 'Presencial',
			appointment_day: 'monday',
			appointment_from: '10:00',
			appointment_to: '11:00',
		});

		userId = user.id;
		patientId = patient.id;
		anotherUserId = anotherUser.id;
	});

	it('should create a new appointment', async () => {
		const appointment = await sut.execute({
			patient_id: patientId,
			userId,
			modality: 'inPerson',
			duration: 30,
		});

		expect(appointment).toBeDefined();
	});

	it('should not be able create a new appointment with invalid user', async () => {
		await expect(() => sut.execute({
			patient_id: patientId,
			userId: 'invalid_user_id',
			duration: 30,
			modality: 'inPerson',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('Shoult not be able to create a new appointment if the user is not the patients owner', async () => {
		await expect(() => sut.execute({
			patient_id: patientId,
			userId: anotherUserId,
			duration: 30,
			modality: 'inPerson',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able create a new appointment with invalid patient', async () => {
		await expect(() => sut.execute({
			patient_id: 'invalid_patient_id',
			userId,
			duration: 30,
			modality: 'inPerson',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
