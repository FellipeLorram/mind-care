import { type Patient } from '@prisma/client';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { z } from 'zod';

export const CreatePatientUseCaseRequest = z.object({
	name: z.string(),
	address: z.string().optional(),
	age: z.number(),
	email: z.string().optional(),
	gender: z.string().optional(),
	observation: z.string().optional(),
	nationality: z.string().optional(),
	birthDate: z.date().optional(),
	modality: z.string(),
	appointment_duration: z.number(),
	appointment_time: z.date(),
	userId: z.string(),
});

type CreatePatientUseCaseRequest = z.infer<typeof CreatePatientUseCaseRequest>;

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
