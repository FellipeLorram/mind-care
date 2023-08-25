import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';

interface UpdateData {
	name?: string
	address?: string | null
	age?: number
	email?: string | null
	gender?: string | null
	observation?: string | null
	nationality?: string | null
	birthDate?: Date | string
	modality?: string | null
	appointment_duration?: number
	appointment_time?: Date | string
}

interface UpdatePatientUseCaseRequest {
	userId: string;
	patientId: string;
	data: UpdateData;
}

interface UpdatePatientUseCaseResponse {
	patient: Patient;
}

export class UpdatePatientUseCase {
	constructor(
		private patientRepository: PatientRepository,
	) { }

	async execute({ userId, patientId, data }: UpdatePatientUseCaseRequest): Promise<UpdatePatientUseCaseResponse> {
		const patientExists = await this.patientRepository.findById(patientId);

		if (!patientExists) {
			throw new ResourceNotFoundError();
		}

		if (patientExists.user_id !== userId) {
			throw new InvalidUserError();
		}

		const patient = await this.patientRepository.update(patientId, {
			name: data.name,
			address: data.address,
			age: data.age,
			email: data.email,
			appointment_duration: data.appointment_duration,
			appointment_time: data.appointment_time,
			birthDate: data.birthDate,
		});

		return {
			patient
		};
	}
}