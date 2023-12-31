import { type DetachedNote } from '@prisma/client';
import { type UserRepository } from '@/server/repositories/user-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type DetachedNoteRepository } from '@/server/repositories/detached-note-repository';
import { z } from 'zod';

export const UpdateDetachedNoteUseCaseRequest = z.object({
	content: z.string(),
	patientId: z.string(),
	userId: z.string(),
	noteId: z.string(),
});

type UpdateDetachedNoteUseCaseRequest = z.infer<typeof UpdateDetachedNoteUseCaseRequest>;

interface UpdateDetachedNoteUseCaseResponse {
	note: DetachedNote;
}

export class UpdateDetachedNoteUseCase {
	constructor(
		private notesRepository: DetachedNoteRepository,
		private userRepository: UserRepository,
		private patientRepository: PatientRepository,
	) { }

	async execute(data: UpdateDetachedNoteUseCaseRequest): Promise<UpdateDetachedNoteUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);
		const noteExists = await this.notesRepository.findById(data.noteId);

		if (!user || !patient || !noteExists) {
			throw new ResourceNotFoundError();
		}

		const note = await this.notesRepository.update(data.noteId, {
			content: data.content,
		});

		return {
			note
		};
	}
}
