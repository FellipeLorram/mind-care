import { z } from 'zod';
import { type DetachedNote } from '@prisma/client';
import { type UserRepository } from '@/server/repositories/user-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type DetachedNoteRepository } from '@/server/repositories/detached-note-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';

export const ListDetachedNoteUseCaseRequest = z.object({
	patientId: z.string(),
	userId: z.string(),
	page: z.number().min(1),
});

type ListDetachedNoteUseCaseRequest = z.infer<typeof ListDetachedNoteUseCaseRequest>;

interface ListDetachedNoteUseCaseResponse {
	notes: DetachedNote[];
}

export class ListDetachedNoteUseCase {
	constructor(
		private notesRepository: DetachedNoteRepository,
		private userRepository: UserRepository,
		private patientRepository: PatientRepository,
	) { }

	async execute(data: ListDetachedNoteUseCaseRequest): Promise<ListDetachedNoteUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);

		if (!user || !patient) {
			throw new ResourceNotFoundError();
		}

		const notes = await this.notesRepository.list(data.patientId, data.page);

		return {
			notes
		};
	}
}
