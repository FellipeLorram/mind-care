import { type PatientRepository } from '@/server/repositories/patient-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';
import { type UserRepository } from '@/server/repositories/user-repository';
import { z } from 'zod';

export const DeletePatientUseCaseRequest = z.object({
	user_id: z.string(),
	patient_id: z.string(),
});

type DeletePatientUseCaseRequest = z.infer<typeof DeletePatientUseCaseRequest>;

export class DeletePatientUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository
	) { }

	async execute({ user_id, patient_id }: DeletePatientUseCaseRequest): Promise<void> {
		const patientExists = await this.patientRepository.findById(patient_id);
		const userExists = await this.userRepository.findById(user_id);

		if (!patientExists || !userExists) {
			throw new ResourceNotFoundError();
		}

		if (patientExists.user_id !== user_id) {
			throw new InvalidUserError();
		}

		await this.patientRepository.delete(patient_id);
	}
}