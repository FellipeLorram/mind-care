import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { GetAppointmentNoteUseCase } from './get-appointment-note';
import { InMemoryAppointmentNotesRepository } from '@/server/repositories/in-memory/in-memory-notes-repository';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';

let sut: GetAppointmentNoteUseCase;
let appointmentNoteRepository: InMemoryAppointmentNotesRepository;
let userId: string;
let patientId: string;
let appointmentId: string;


describe('Get Single Appointment note Use Case', () => {
	beforeEach(async () => {
		appointmentNoteRepository = new InMemoryAppointmentNotesRepository();
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const appointmentRepository = new InMemoryAppointmentsRepository();

		sut = new GetAppointmentNoteUseCase(
			appointmentNoteRepository,
			userRepository,
			patientRepository,
			appointmentRepository,
		);

		const user = await userRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
		});

		userId = user.id;

		const patient = await patientRepository.create({
			age: 20,
			name: 'any_name',
			modality: 'any_modality',
			user_id: userId,
			appointment_duration: 30,
			appointment_time: new Date(),
		});

		patientId = patient.id;

		const appointment = await appointmentRepository.create({
			patient_id: patientId,
			appointment_time: new Date(),
		});

		appointmentId = appointment.id;

	});

	it('should be able to get a single appointment note', async () => {
		const appointmentNote = await appointmentNoteRepository.create({
			content: 'any_content',
			appointment_id: appointmentId,
		});

		const response = await sut.execute({
			appointmentNoteId: appointmentNote.id,
			appointmentId,
			patientId,
			userId,
		});

		expect(response.appointmentNote).toEqual(appointmentNote);
	});

	it('should not be able to get a single appointment note if user does not exist', async () => {
		const appointmentNote = await appointmentNoteRepository.create({
			content: 'any_content',
			appointment_id: appointmentId,
		});

		await expect(sut.execute({
			appointmentNoteId: appointmentNote.id,
			appointmentId,
			patientId,
			userId: 'non-existing-user-id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to get a single appointment note if patient does not exist', async () => {
		const appointmentNote = await appointmentNoteRepository.create({
			content: 'any_content',
			appointment_id: appointmentId,
		});

		await expect(sut.execute({
			appointmentNoteId: appointmentNote.id,
			appointmentId,
			patientId: 'non-existing-patient-id',
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to get a single appointment note if appointment does not exist', async () => {
		const appointmentNote = await appointmentNoteRepository.create({
			content: 'any_content',
			appointment_id: appointmentId,
		});

		await expect(sut.execute({
			appointmentNoteId: appointmentNote.id,
			appointmentId: 'non-existing-appointment-id',
			patientId,
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to get a single appointment note if appointment note does not exist', async () => {
		await expect(sut.execute({
			appointmentNoteId: 'non-existing-appointment-note-id',
			appointmentId,
			patientId,
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
