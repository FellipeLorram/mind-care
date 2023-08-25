import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';
import { z } from 'zod';
import { type UserRepository } from '@/server/repositories/user-repository';

export const UpdatePatientUseCaseRequest = z.object({
	userId: z.string(),
	patientId: z.string(),
	name: z.string().optional(),
	address: z.string().optional(),
	age: z.number().optional(),
	email: z.string().optional(),
	appointment_duration: z.number().optional(),
	appointment_time: z.string().optional(),
	birthDate: z.string().optional(),
	gender: z.string().optional(),
	observation: z.string().optional(),
	modality: z.string().optional(),
	nationality: z.string().optional(),
});

type UpdatePatientUseCaseRequest = z.infer<typeof UpdatePatientUseCaseRequest>;

interface UpdatePatientUseCaseResponse {
	patient: Patient;
}

export class UpdatePatientUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
	) { }

	async execute(data: UpdatePatientUseCaseRequest): Promise<UpdatePatientUseCaseResponse> {
		const patientExists = await this.patientRepository.findById(data.patientId);
		const userExists = await this.userRepository.findById(data.userId);

		if (!patientExists || !userExists) {
			throw new ResourceNotFoundError();
		}

		if (patientExists.user_id !== data.userId) {
			throw new InvalidUserError();
		}

		const patient = await this.patientRepository.update(data.patientId, {
			...data,
		});

		return {
			patient
		};
	}
}