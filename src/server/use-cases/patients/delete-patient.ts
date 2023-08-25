import { type PatientRepository } from '@/server/repositories/patient-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';


interface DeletePatientUseCaseRequest {
	userId: string;
	patientId: string;
}

export class DeletePatientUseCase {
	constructor(
		private patientRepository: PatientRepository,
	) { }

	async execute({ userId, patientId }: DeletePatientUseCaseRequest): Promise<void> {
		const patientExists = await this.patientRepository.findById(patientId);

		if (!patientExists) {
			throw new ResourceNotFoundError();
		}

		if (patientExists.user_id !== userId) {
			throw new InvalidUserError();
		}

		await this.patientRepository.delete(patientId);
	}
}