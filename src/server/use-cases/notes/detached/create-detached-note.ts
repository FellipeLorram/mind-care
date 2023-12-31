import { type DetachedNote } from '@prisma/client';
import { type UserRepository } from '@/server/repositories/user-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type DetachedNoteRepository } from '@/server/repositories/detached-note-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { z } from 'zod';

export const CreateDetachedNoteUseCaseRequest = z.object({
	content: z.string(),
	patientId: z.string(),
	userId: z.string(),
});

type CreateDetachedNoteUseCaseRequest = z.infer<typeof CreateDetachedNoteUseCaseRequest>;

interface CreateDetachedNoteUseCaseResponse {
	note: DetachedNote;
}

export class CreateDetachedNoteUseCase {
	constructor(
		private notesRepository: DetachedNoteRepository,
		private userRepository: UserRepository,
		private patientRepository: PatientRepository,
	) { }

	async execute(data: CreateDetachedNoteUseCaseRequest): Promise<CreateDetachedNoteUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);

		if (!user || !patient) {
			throw new ResourceNotFoundError();
		}

		const note = await this.notesRepository.create({
			content: data.content,
			patient_id: data.patientId,
		});

		return {
			note
		};
	}
}
