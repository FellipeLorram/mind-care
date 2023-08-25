import { beforeEach, describe, expect, it } from 'vitest';
import { CreateDetachedNoteUseCase } from './create-detached-note';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InMemoryDetachedNotesRepository } from '@/server/repositories/in-memory/in-memory-detached-notes-repository';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

let sut: CreateDetachedNoteUseCase;
let userId: string;
let patientId: string;

describe('Create Note Use Case', () => {
	beforeEach(async () => {
		const noteRepository = new InMemoryDetachedNotesRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const userRepository = new InMemoryUsersRepository();

		sut = new CreateDetachedNoteUseCase(
			noteRepository,
			userRepository,
			patientRepository
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
	});

	it('should be able to create a note', async () => {
		const note = await sut.execute({
			patientId,
			content: 'any_content',
			userId,
		});

		expect(note).toBeDefined();
	});

	it('should not be able to create a note with invalid patient id', async () => {
		await expect(async () => {
			await sut.execute({
				patientId: 'invalid-id',
				content: 'any_content',
				userId,
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to create a note with invalid user id', async () => {
		await expect(async () => {
			await sut.execute({
				patientId,
				content: 'any_content',
				userId: 'invalid-id',
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
