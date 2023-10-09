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
	birth_date: z.date().optional(),
	occupation: z.string().optional(),
	user_id: z.string(),
});

type CreatePatientUseCaseRequest = z.infer<typeof CreatePatientUseCaseRequest>;

interface CreatePatientUseCaseResponse {
	patient: Patient;
}

// enum AvailableWeekDay {
// 	Monday = 'monday',
// 	Tuesday = 'tuesday',
// 	Wednesday = 'wednesday',
// 	Thursday = 'thursday',
// 	Friday = 'friday',
// 	Saturday = 'saturday',
// 	Sunday = 'sunday',
// }

export class CreatePatientUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
	) {
	}

	async execute(data: CreatePatientUseCaseRequest): Promise<CreatePatientUseCaseResponse> {
		const user = await this.userRepository.findById(data.user_id);
		if (!user) {
			throw new ResourceNotFoundError();
		}

		const patient = await this.patientRepository.create(data);

		return {
			patient
		};
	}
}
