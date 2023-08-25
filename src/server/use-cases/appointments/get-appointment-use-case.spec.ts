import { describe, it, expect, beforeEach } from 'vitest';
import { GetAppointmentUseCase } from './get-appointment';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidPatientError } from '../errors/invalid-patient-error';

let sut: GetAppointmentUseCase;
let appointmentId: string;
let patientId: string;
let anotherPatientId: string;
let userId: string;

describe('Get Appointment Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const appointmentRepository = new InMemoryAppointmentsRepository();

		sut = new GetAppointmentUseCase(
			appointmentRepository,
			patientRepository,
			userRepository,
		);

		const user = await userRepository.create({
			name: 'any_name',
			email: 'any_email@email.com',
		});

		const patient = await patientRepository.create({
			user_id: user.id,
			age: 10,
			name: 'john doe',
			appointment_duration: 30,
			appointment_time: new Date(),
			modality: 'Presencial'
		});

		const anotherPatient = await patientRepository.create({
			user_id: user.id,
			age: 10,
			name: 'john doe',
			appointment_duration: 30,
			appointment_time: new Date(),
			modality: 'Presencial'
		});

		const appointment = await appointmentRepository.create({
			patient_id: patient.id,
			appointment_time: new Date(),
		});

		userId = user.id;
		patientId = patient.id;
		anotherPatientId = anotherPatient.id;
		appointmentId = appointment.id;
	});

	it('should be able to get a appointment', async () => {
		const appointment = await sut.execute({
			appointmentId,
			patientId,
			userId,
		});

		expect(appointment).toBeDefined();
	});

	it('should not be able to get a appointment with invalid id', async () => {
		await expect(() => sut.execute({
			appointmentId: 'invalid_id',
			patientId,
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to get a appointment with invalid user', async () => {
		await expect(() => sut.execute({
			appointmentId,
			patientId,
			userId: 'invalid_id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to get a appointment with invalid patient', async () => {
		await expect(() => sut.execute({
			appointmentId,
			patientId: 'invalid_id',
			userId,
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
