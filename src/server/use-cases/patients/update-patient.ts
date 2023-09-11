import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';
import { type UserRepository } from '@/server/repositories/user-repository';
import { z } from 'zod';

export const UpdatePatientUseCaseRequest = z.object({
	userId: z.string(),
	patientId: z.string(),
	name: z.string().optional(),
	address: z.string().optional(),
	age: z.number().optional(),
	email: z.string().optional(),
	appointment_from: z.string().optional(),
	appointment_to: z.string().optional(),
	appointment_day: z.string().optional(),
	appointment_time: z.string().optional(),
	birthDate: z.string().optional(),
	gender: z.string().optional(),
	observation: z.string().optional(),
	modality: z.string().optional(),
	nationality: z.string().optional(),
	phones: z.array(z.object({
		number: z.string(),
		refersTo: z.string(),
		id: z.string(),
	})).optional(),
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
			phones: {
				upsert: data.phones?.map(phone => ({
					where: {
						id: phone.id,
						number: phone.number,
					},
					create: {
						number: phone.number,
						refers_to: phone.refersTo,
					},
					update: {
						refers_to: phone.refersTo,
					},
				})),
			},
		})

		return {
			patient
		};
	}
}