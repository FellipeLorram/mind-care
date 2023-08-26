import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { GetDetachedNoteUseCase } from './get-detached-note';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { InMemoryDetachedNotesRepository } from '@/server/repositories/in-memory/in-memory-detached-notes-repository';

let sut: GetDetachedNoteUseCase;
let detachedNoteRepository: InMemoryDetachedNotesRepository;
let userId: string;
let patientId: string;
let appointmentId: string;


describe('Get Single Appointment note Use Case', () => {
	beforeEach(async () => {
		detachedNoteRepository = new InMemoryDetachedNotesRepository();
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const appointmentRepository = new InMemoryAppointmentsRepository();

		sut = new GetDetachedNoteUseCase(
			detachedNoteRepository,
			userRepository,
			patientRepository,
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
		const detachedNote = await detachedNoteRepository.create({
			content: 'any_content',
			patient_id: appointmentId,
		});

		const response = await sut.execute({
			detachedNoteId: detachedNote.id,
			patientId,
			userId,
		});

		expect(response.note).toEqual(detachedNote);
	});

	it('should not be able to get a single appointment note if user does not exist', async () => {
		const appointmentNote = await detachedNoteRepository.create({
			content: 'any_content',
			patient_id: appointmentId,
		});

		await expect(sut.execute({
			detachedNoteId: appointmentNote.id,
			patientId,
			userId: 'non-existing-user-id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to get a single appointment note if patient does not exist', async () => {
		const detachedNote = await detachedNoteRepository.create({
			content: 'any_content',
			patient_id: appointmentId,
		});

		await expect(sut.execute({
			detachedNoteId: detachedNote.id,
			patientId: 'non-existing-patient-id',
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to get a single appointment note if appointment note does not exist', async () => {
		await expect(sut.execute({
			detachedNoteId: 'non-existing-appointment-note-id',
			patientId,
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
