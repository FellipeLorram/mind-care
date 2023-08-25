import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { z } from 'zod';

export const CreateAppointmentUseCaseRequest = z.object({
	patientId: z.string(),
	userId: z.string(),
	date: z.date(),
});

type CreateAppointmentUseCaseRequest = z.infer<typeof CreateAppointmentUseCaseRequest>;

export const CreateAppointmentUseCaseResponse = z.object({
	appointment: z.object({
		id: z.string(),
		appointment_time: z.date(),
		patient_id: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
});

type CreateAppointmentUseCaseResponse = z.infer<typeof CreateAppointmentUseCaseResponse>;

export class CreateAppointmentUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
		private appointmentRepository: AppointmentRepository,
	) { }

	async execute(data: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);

		if (!user || !patient || user.id !== patient.user_id) {
			throw new ResourceNotFoundError();
		}

		const appointment = await this.appointmentRepository.create({
			appointment_time: data.date,
			...data,
			patient_id: data.patientId,
		});

		return {
			appointment,
		};
	}
}
