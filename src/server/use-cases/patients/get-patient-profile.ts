import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { type PatientWithPhones, type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { z } from 'zod';

export const GetPatientProfileUseCaseRequest = z.object({
	patient_id: z.string(),
	user_id: z.string(),
});

type GetPatientProfileUseCaseRequest = z.infer<typeof GetPatientProfileUseCaseRequest>;

interface GetPatientProfileUseCaseResponse {
	patient: PatientWithPhones 
}

export class GetPatientProfileUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository
	) { }

	async execute({ patient_id, user_id }: GetPatientProfileUseCaseRequest): Promise<GetPatientProfileUseCaseResponse> {
		const userExists = await this.userRepository.findById(user_id);
		const patient = await this.patientRepository.findById(patient_id);

		if (
			!patient
			|| !userExists
		) {
			throw new ResourceNotFoundError();
		}

		return {
			patient,
		};
	}
}
