import { beforeEach, describe, expect, it } from 'vitest';
import { UpdateAppointmentNoteUseCase } from './update-appointment-note';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { InMemoryAppointmentNotesRepository } from '@/server/repositories/in-memory/in-memory-notes-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';

let sut: UpdateAppointmentNoteUseCase;
let appointmentId: string;
let noteId: string;
let userId: string;
let patientId: string;

describe('Update Appointment Note Use Case', () => {
	beforeEach(async () => {
		const appointmentNotesRepository = new InMemoryAppointmentNotesRepository();
		const appointmentsRepository = new InMemoryAppointmentsRepository();
		const usersRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();

		sut = new UpdateAppointmentNoteUseCase(
			appointmentNotesRepository,
			appointmentsRepository,
			usersRepository,
			patientRepository
		);

		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		const patient = await patientRepository.create({
			age: 20,
			name: 'any_name',
			modality: 'any_modality',
			user_id: user.id,
			appointment_duration: 30,
			appointment_time: new Date(),
		});

		const appointment = await appointmentsRepository.create({
			patient_id: patient.id,
			appointment_time: new Date(),
		});

		const note = await appointmentNotesRepository.create({
			content: 'Note 1',
			appointment_id: appointment.id,
		});

		appointmentId = appointment.id;
		noteId = note.id;
		userId = user.id;
		patientId = patient.id;
	});

	it('should be able update to a note', async () => {
		const { note } = await sut.execute({
			appointmentId,
			content: 'Note 2',
			noteId,
			patientId,
			userId,
		});

		expect(note.content).toBe('Note 2');
	});

	it('should not be able to update a non-existing note', async () => {
		await expect(() => sut.execute({
			appointmentId,
			content: 'Note 2',
			noteId: 'invalid-id',
			patientId,
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update a note with an invalid appointment id', async () => {
		await expect(() => sut.execute({
			appointmentId: 'invalid-id',
			content: 'Note 2',
			noteId,
			patientId,
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update a note with an invalid user id', async () => {
		await expect(() => sut.execute({
			appointmentId,
			content: 'Note 2',
			noteId,
			patientId,
			userId: 'invalid-id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update a note with an invalid patient id', async () => {
		await expect(() => sut.execute({
			appointmentId,
			content: 'Note 2',
			noteId,
			patientId: 'invalid-id',
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
