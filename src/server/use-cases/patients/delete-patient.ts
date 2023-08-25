import { type PatientRepository } from '@/server/repositories/patient-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';
import { type UserRepository } from '@/server/repositories/user-repository';
import { z } from 'zod';

export const DeletePatientUseCaseRequest = z.object({
	userId: z.string(),
	patientId: z.string(),
});

type DeletePatientUseCaseRequest = z.infer<typeof DeletePatientUseCaseRequest>;

export class DeletePatientUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository
	) { }

	async execute({ userId, patientId }: DeletePatientUseCaseRequest): Promise<void> {
		const patientExists = await this.patientRepository.findById(patientId);
		const userExists = await this.userRepository.findById(userId);

		if (!patientExists || !userExists) {
			throw new ResourceNotFoundError();
		}

		if (patientExists.user_id !== userId) {
			throw new InvalidUserError();
		}

		await this.patientRepository.delete(patientId);
	}
}