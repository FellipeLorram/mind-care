import { type UserRepository } from '@/server/repositories/user-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { z } from 'zod';
import { type DetachedNoteRepository } from '@/server/repositories/detached-note-repository';

export const DeleteDetachedNoteUseCaseRequest = z.object({
	patientId: z.string(),
	userId: z.string(),
	noteId: z.string(),
});

type DeleteDetachedNoteUseCaseRequestType = z.infer<typeof DeleteDetachedNoteUseCaseRequest>;

export class DeleteDetachedNoteUseCase {
	constructor(
		private notesRepository: DetachedNoteRepository,
		private userRepository: UserRepository,
		private patientRepository: PatientRepository,
	) { }

	async execute(data: DeleteDetachedNoteUseCaseRequestType): Promise<void> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);
		const noteExists = await this.notesRepository.findById(data.noteId);

		if (
			!user
			|| !patient
			|| !noteExists
		) {
			throw new ResourceNotFoundError();
		}

		await this.notesRepository.delete(data.noteId);
	}
}
