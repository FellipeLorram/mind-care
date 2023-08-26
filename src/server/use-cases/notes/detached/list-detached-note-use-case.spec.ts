import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { InMemoryDetachedNotesRepository } from '@/server/repositories/in-memory/in-memory-detached-notes-repository';
import { ListDetachedNoteUseCase } from './list-detached-note';

let sut: ListDetachedNoteUseCase;
let detachedNoteRepository: InMemoryDetachedNotesRepository;
let userId: string;
let patientId: string;


describe('List Detached notes Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		detachedNoteRepository = new InMemoryDetachedNotesRepository();

		sut = new ListDetachedNoteUseCase(
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

	it('should not be able to list detached notes if user does not exists', async () => {
		await expect(sut.execute({
			patientId,
			userId: 'invalid_user_id',
			page: 1,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to list detached notes if patient does not exists', async () => {
		await expect(sut.execute({
			patientId: 'invalid_patient_id',
			userId,
			page: 1,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should be able to list detached notes with pagination', async () => {
		for (let i = 0; i < 15; i++) {
			await detachedNoteRepository.create({
				content: 'any_content',
				patient_id: patientId,
			});
		}

		const { notes } = await sut.execute({
			patientId,
			userId,
			page: 1,
		});

		expect(notes.length).toBe(10);
	});
});
