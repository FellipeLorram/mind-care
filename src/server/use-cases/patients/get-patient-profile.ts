import { type Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { z } from 'zod';

export const GetPatientProfileUseCaseRequest = z.object({
	patientId: z.string(),
	userId: z.string(),
});

type GetPatientProfileUseCaseRequest = z.infer<typeof GetPatientProfileUseCaseRequest>;

interface GetPatientProfileUseCaseResponse {
	patient: Patient;
}

export class GetPatientProfileUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository
	) { }

	async execute({ patientId, userId }: GetPatientProfileUseCaseRequest): Promise<GetPatientProfileUseCaseResponse> {
		const userExists = await this.userRepository.findById(userId);
		const patient = await this.patientRepository.findById(patientId);

		if (
			!patient
			|| !userExists
		) {
			throw new ResourceNotFoundError();
		}

		return {
			patient
		};
	}
}
