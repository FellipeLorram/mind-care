import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';

import { DeleteAppointmentUseCase } from './delete-appointment';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidPatientError } from '../errors/invalid-patient-error';

let sut: DeleteAppointmentUseCase;
let patientId: string;
let userId: string;
let appointmentId: string;
let anotherPatientId: string;
let appointmentRepository: InMemoryAppointmentsRepository;

describe('Delete Appointment Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		appointmentRepository = new InMemoryAppointmentsRepository();
		sut = new DeleteAppointmentUseCase(
			appointmentRepository,
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
			appointment_duration: 30,
			address: 'Rua 1',
			appointment_time: new Date(),
			modality: 'Presencial',
			user_id: user.id,
		});

		patientId = id;

		const appointment = await appointmentRepository.create({
			patient_id: patientId,
			appointment_time: new Date(),
		});

		const anotherPatient = await patientRepository.create({
			name: 'John Doesnt',
			email: 'johndoesnt@example.com',
			age: 20,
			appointment_duration: 30,
			address: 'Rua 5',
			appointment_time: new Date(),
			modality: 'Presencial',
			user_id: user.id,
		});

		anotherPatientId = anotherPatient.id;
		appointmentId = appointment.id;
	});

	it('should be able to delete a appointment', async () => {
		await sut.execute({
			userId,
			patientId,
			appointmentId,
		});

		const appointment = await appointmentRepository.findById(appointmentId);

		expect(appointment).toBeNull();
	});

	it('should not be able to delete a appointment with invalid id', async () => {
		await expect(() => sut.execute({
			userId,
			patientId,
			appointmentId: 'invalid-id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete a appointment with invalid user', async () => {
		await expect(() => sut.execute({
			userId: 'invalid-id',
			patientId,
			appointmentId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete a appointment with invalid patient', async () => {
		await expect(() => sut.execute({
			userId,
			patientId: 'invalid-id',
			appointmentId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete a appointment if the patient is not the owner', async () => {
		await expect(() => sut.execute({
			userId,
			patientId: anotherPatientId,
			appointmentId,
		})).rejects.toBeInstanceOf(InvalidPatientError);
	});
});
