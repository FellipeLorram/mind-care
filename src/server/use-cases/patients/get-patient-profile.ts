import { type Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { type PatientRepository } from '@/server/repositories/patient-repository';

interface GetPatientProfileUseCaseRequest {
	patientId: string;
}

interface GetPatientProfileUseCaseResponse {
	patient: Patient;
}

export class GetPatientProfileUseCase {
	constructor(private patientRepository: PatientRepository) { }

	async execute({ patientId }: GetPatientProfileUseCaseRequest): Promise<GetPatientProfileUseCaseResponse> {
		const patient = await this.patientRepository.findById(patientId);

		if (!patient) {
			throw new ResourceNotFoundError();
		}

		return {
			patient
		};
	}
}
