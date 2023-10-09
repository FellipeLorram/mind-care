import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { type Patient } from '@prisma/client';
import { InavalidPageError } from '../errors/invalid-page-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { z } from 'zod';

export const ListPatientsUseCaseRequest = z.object({
	user_id: z.string(),
	page: z.number(),
	query: z.string().optional(),
});

type ListPatientsUseCaseRequest = z.infer<typeof ListPatientsUseCaseRequest>;

interface ListPatientsUseCaseResponse {
	patients: Patient[];
	count: number;
}

export class ListPatientsUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private usersRepository: UserRepository,
	) { }

	async execute(data: ListPatientsUseCaseRequest): Promise<ListPatientsUseCaseResponse> {
		if (data.page < 1) {
			throw new InavalidPageError();
		}
		const user = await this.usersRepository.findById(data.user_id);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const { patients, count } = await this.patientRepository.list(data.user_id, data.page, data.query);

		return {
			patients,
			count,
		};
	}
}