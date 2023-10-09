import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';
import { type UserRepository } from '@/server/repositories/user-repository';
import { z } from 'zod';

export const UpdatePatientUseCaseRequest = z.object({
	user_id: z.string(),
	patient_id: z.string(),
	name: z.string().optional(),
	address: z.string().optional(),
	age: z.number().optional(),
	email: z.string().optional(),
	appointment_from: z.string().optional(),
	appointment_to: z.string().optional(),
	appointment_day: z.string().optional(),
	appointment_time: z.string().optional(),
	birth_date: z.string().optional(),
	gender: z.string().optional(),
	observation: z.string().optional(),
	modality: z.string().optional(),
	nationality: z.string().optional(),
	occupation: z.string().optional(),
	allergies: z.string().optional(),
	medications: z.string().optional(),
	chronicDiseases: z.string().optional(),
	medicalHistory: z.string().optional(),
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
		const { patient_id, user_id, ...updatedData } = data;

		const patientExists = await this.patientRepository.findById(patient_id);
		const userExists = await this.userRepository.findById(user_id);

		if (!patientExists || !userExists) {
			throw new ResourceNotFoundError();
		}

		if (patientExists.user_id !== user_id) {
			throw new InvalidUserError();
		}

		const patient = await this.patientRepository.update(patient_id, {
			name: updatedData.name,
			address: updatedData.address,
			age: updatedData.age,
			email: updatedData.email,
			appointment_from: updatedData.appointment_from,
			appointment_to: updatedData.appointment_to,
			appointment_day: updatedData.appointment_day,
			allergies: updatedData.allergies,
			medications: updatedData.medications,
			gender: updatedData.gender,
			observation: updatedData.observation,
			modality: updatedData.modality,
			occupation: updatedData.occupation,
			nationality: updatedData.nationality,
			
			chronic_diseases: updatedData.chronicDiseases,
			medical_history: updatedData.medicalHistory,
			birth_date: updatedData.birth_date ? new Date(updatedData.birth_date) : undefined,
			user_id: data.user_id,
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