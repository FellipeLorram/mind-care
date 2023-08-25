import { type Patient } from '@prisma/client';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CreatePatientUseCaseRequest {
	name: string
	address?: string
	age: number
	email?: string
	gender?: string
	observation?: string
	nationality?: string
	birthDate?: Date | string
	modality: string
	appointment_duration: number
	appointment_time: Date | string
	userId: string;
}


interface CreatePatientUseCaseResponse {
	patient: Patient;
}

export class CreatePatientUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository
	) { }

	async execute(data: CreatePatientUseCaseRequest): Promise<CreatePatientUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const patient = await this.patientRepository.create({
			...data,
			user_id: data.userId
		});

		return {
			patient
		};
	}
}
