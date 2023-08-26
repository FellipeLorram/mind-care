import { type DetachedNoteRepository } from '@/server/repositories/detached-note-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { type DetachedNote } from '@prisma/client';
import { z } from 'zod';

export const GetDetachedNoteUseCaseRequest = z.object({
	detachedNoteId: z.string(),
	userId: z.string(),
	patientId: z.string(),
});

type GetDetachedNoteUseCaseRequestType = z.infer<typeof GetDetachedNoteUseCaseRequest>;

interface GetDetachedNoteUseCaseResponse {
	note: DetachedNote;
}

export class GetDetachedNoteUseCase {
	constructor(
		private detachedNotesRepository: DetachedNoteRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository,
	) { }

	async execute({
		detachedNoteId,
		patientId,
		userId
	}: GetDetachedNoteUseCaseRequestType): Promise<GetDetachedNoteUseCaseResponse> {
		const note = await this.detachedNotesRepository.findById(detachedNoteId);
		const user = await this.usersRepository.findById(userId);
		const patient = await this.patientsRepository.findById(patientId);

		if (
			!note
			|| !user
			|| !patient
		) {
			throw new ResourceNotFoundError();
		}

		return {
			note
		};
	}
}