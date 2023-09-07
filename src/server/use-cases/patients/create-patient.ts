import { type Patient } from '@prisma/client';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { z } from 'zod';
import { InavalidAppointmentDurationError } from '../errors/invalid-appointment-duration-error';
import { InavalidAppointmentDayError } from '../errors/invalid-appointment-day-error';

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
	appointment_from: z.string(),
	appointment_to: z.string(),
	appointment_day: z.string(),
	userId: z.string(),
	phones: z.array(z.object({
		number: z.string(),
		refersTo: z.string(),
	})).optional(),
});

type CreatePatientUseCaseRequest = z.infer<typeof CreatePatientUseCaseRequest>;

interface CreatePatientUseCaseResponse {
	patient: Patient;
}

enum AvailableWeekDay {
	Monday = 'monday',
	Tuesday = 'tuesday',
	Wednesday = 'wednesday',
	Thursday = 'thursday',
	Friday = 'friday',
	Saturday = 'saturday',
	Sunday = 'sunday',
}

export class CreatePatientUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
	) {
	}

	async execute(data: CreatePatientUseCaseRequest): Promise<CreatePatientUseCaseResponse> {
		if (data.appointment_from >= data.appointment_to) {
			throw new InavalidAppointmentDurationError();
		}

		if (!Object.values(AvailableWeekDay).includes(data.appointment_day as AvailableWeekDay)) {
			throw new InavalidAppointmentDayError();
		}

		const user = await this.userRepository.findById(data.userId);
		if (!user) {
			throw new ResourceNotFoundError();
		}

		const patient = await this.patientRepository.create({
			name: data.name,
			address: data.address,
			age: data.age,
			email: data.email,
			appointment_day: data.appointment_day,
			appointment_from: data.appointment_from,
			appointment_to: data.appointment_to,
			birthDate: data.birthDate,
			modality: data.modality,
			observation: data.observation,
			gender: data.gender,
			nationality: data.nationality,
			user_id: data.userId,
			phones: {
				create: data.phones?.map(phone => ({
					number: phone.number,
					refers_to: phone.refersTo,
				}))
			},
		});

		return {
			patient
		};
	}
}
