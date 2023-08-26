import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { DeleteDetachedNoteUseCase } from './delete-detached-note';
import { InMemoryDetachedNotesRepository } from '@/server/repositories/in-memory/in-memory-detached-notes-repository';

let sut: DeleteDetachedNoteUseCase;
let detachedNoteRepository: InMemoryDetachedNotesRepository;
let userId: string;
let patientId: string;
let appointmentId: string;


describe('Delete Detached note Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		detachedNoteRepository = new InMemoryDetachedNotesRepository();

		sut = new DeleteDetachedNoteUseCase(
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
	});

	it('should be able to delete an detached note', async () => {
		const note = await detachedNoteRepository.create({
			content: 'any_content',
			patient_id: patientId,
		});

		await sut.execute({
			noteId: note.id,
			patientId,
			userId,
		});

		const noteExists = await detachedNoteRepository.findById(note.id);

		expect(noteExists).toBeNull();
	});

	it('should not be able to delete a detached note if user does not exist', async () => {
		const appointmentNote = await detachedNoteRepository.create({
			content: 'any_content',
			patient_id: appointmentId,
		});

		await expect(sut.execute({
			noteId: appointmentNote.id,
			patientId,
			userId: 'non-existing-user-id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete a detached note if patient does not exist', async () => {
		const note = await detachedNoteRepository.create({
			content: 'any_content',
			patient_id: appointmentId,
		});

		await expect(sut.execute({
			noteId: note.id,
			patientId: 'non-existing-patient-id',
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete an detached note if detached note does not exist', async () => {
		await expect(sut.execute({
			noteId: 'non-existing-appointment-note-id',
			patientId,
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
