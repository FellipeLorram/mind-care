import { describe, it, expect, beforeEach } from 'vitest';
import { CreateAppointmentNoteUseCase } from './create-appointment-note';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryAppointmentNotesRepository } from '@/server/repositories/in-memory/in-memory-notes-repository';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

let sut: CreateAppointmentNoteUseCase;
let appointmentId: string;
let userId: string;
let patientId: string;

describe('Create Appointment Note Use Case', () => {
	beforeEach(async () => {
		const appointmentNoteRepository = new InMemoryAppointmentNotesRepository();
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const appointmentRepository = new InMemoryAppointmentsRepository();
		
		sut = new CreateAppointmentNoteUseCase(
			appointmentNoteRepository,
			userRepository,
			patientRepository,
			appointmentRepository
		);

		const user = await userRepository.create({
			name: 'any_name',
			email: 'any_email@example.com',
		});

		userId = user.id;

		const patient = await patientRepository.create({
			user_id: user.id,
			age: 10,
			name: 'john doe',
			appointment_duration: 30,
			appointment_time: new Date(),
			modality: 'Presencial'
		});

		patientId = patient.id;

		const appointment = await appointmentRepository.create({
			patient_id: patient.id,
			appointment_time: new Date(),
		});

		appointmentId = appointment.id;
	});

	it('should be able to create an appointment note', async () => {
		const { note } = await sut.execute({
			appointmentId,
			content: 'any_content',
			patientId,
			userId,
		});

		expect(note).toBeDefined();
		expect(note.content).toBe('any_content');
	});

	it('should not be able to create an appointment note if the user does not exist', async () => {
		await expect(() => sut.execute({
			appointmentId,
			content: 'any_content',
			patientId,
			userId: 'invalid_user_id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to create an appointment note if the patient does not exist', async () => {
		await expect(() => sut.execute({
			appointmentId,
			content: 'any_content',
			patientId: 'invalid_patient_id',
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to create an appointment note if the appointment does not exist', async () => {
		await expect(() => sut.execute({
			appointmentId: 'invalid_appointment_id',
			content: 'any_content',
			patientId,
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
