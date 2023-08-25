import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { UpdateDetachedNoteUseCase } from './update-detached-note';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryDetachedNotesRepository } from '@/server/repositories/in-memory/in-memory-detached-notes-repository';

let sut: UpdateDetachedNoteUseCase;
let noteId: string;
let userId: string;
let patientId: string;

describe('Update Detached Note Use Case', () => {
	beforeEach(async () => {
		const notesRepository = new InMemoryDetachedNotesRepository();
		const usersRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();

		sut = new UpdateDetachedNoteUseCase(
			notesRepository,
			usersRepository,
			patientRepository
		);

		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		const patient = await patientRepository.create({
			user_id: user.id,
			age: 10,
			name: 'john doe',
			appointment_duration: 30,
			appointment_time: new Date(),
			modality: 'Presencial'
		});

		const note = await notesRepository.create({
			content: 'Note 1',
			patient_id: patient.id,
		});

		patientId = patient.id;
		noteId = note.id;
		userId = user.id;

	});

	it('should be able to update a detached note', async () => {
		const { note } = await sut.execute({
			content: 'Note 2',
			noteId,
			patientId,
			userId,
		});

		expect(note.content).toBe('Note 2');
	});

	it('should not be able to update a note with an invalid note id', async () => {
		await expect(() => sut.execute({
			content: 'Note 2',
			noteId: 'invalid-id',
			patientId,
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update a note with an invalid user id', async () => {
		await expect(() => sut.execute({
			content: 'Note 2',
			noteId,
			patientId,
			userId: 'invalid-id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update a note with an invalid patient id', async () => {
		await expect(() => sut.execute({
			content: 'Note 2',
			noteId,
			patientId: 'invalid-id',
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
