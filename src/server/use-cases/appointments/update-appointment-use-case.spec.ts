import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { type Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { UpdateAppointmentsUseCase } from './update-appointment';

let sut: UpdateAppointmentsUseCase;
let patient: Patient;
let userId: string;
let patientId: string;
let appointmentId: string;
const appointmentDate = new Date();

describe('Update Patient Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const appointmentRepository = new InMemoryAppointmentsRepository();
		sut = new UpdateAppointmentsUseCase(
			appointmentRepository,
			userRepository,
			patientRepository
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
		});

		const appointment = await appointmentRepository.create({
			communication_effectiveness: 1,
			engagement_level: 1,
			progress: 1,
			duration: 60,
			patient_id: patient.id,
		});

		patientId = patient.id;
		appointmentId = appointment.id;
	});

	it('should be able to update an appointment', async () => {
		const { appointment } = await sut.execute({
			engagement_level: 5,
			userId,
			patientId,
			appointment_id: appointmentId,
		});

		expect(appointment?.engagement_level).not.toBe(1);
		expect(appointment?.engagement_level).toBe(5);
	});

	it('should not be able to update an appointment if patient does not exists', async () => {
		await expect(() => sut.execute({
			userId,
			patientId: 'invalid-id',
			appointment_id: appointmentId,
			

		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update an appointment if user is not the owner', async () => {
		await expect(() => sut.execute({
			userId: 'invalid-id',
			patientId,
			appointment_id: appointmentId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update an appointment if appointment does not exists', async () => {
		await expect(() => sut.execute({
			userId,
			patientId,
			appointment_id: 'invalid-id',

		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
