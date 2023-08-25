import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { type Appointment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { z } from 'zod';

// interface UpdateData {
// 	appointment_time: Date;
// }

// interface UpdateAppointmentsUseCaseRequest {
// 	userId: string;
// 	patientId: string;
// 	appointmentId: string;
// 	data: UpdateData;
// }

export const UpdateAppointmentsUseCaseRequest = z.object({
	userId: z.string(),
	patientId: z.string(),
	appointmentId: z.string(),
	appointmentTime: z.date(),
});

type UpdateAppointmentsUseCaseRequest = z.infer<typeof UpdateAppointmentsUseCaseRequest>;

export const UpdateAppointmentsUseCaseResponse = z.object({
	appointment: z.object({
		id: z.string(),
		appointment_time: z.date(),
		patient_id: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
});

type UpdateAppointmentsUseCaseResponse = z.infer<typeof UpdateAppointmentsUseCaseResponse>;

export class UpdateAppointmentsUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository
	) { }

	async execute(data: UpdateAppointmentsUseCaseRequest): Promise<UpdateAppointmentsUseCaseResponse> {
		const { userId, patientId, appointmentId, appointmentTime } = data;

		const appointmentExists = await this.appointmentRepository.findById(appointmentId);
		const user = await this.usersRepository.findById(userId);
		const patient = await this.patientsRepository.findById(patientId);

		if (
			!appointmentExists
			|| !user
			|| !patient

		) {
			throw new ResourceNotFoundError();
		}

		const appointment = await this.appointmentRepository.update(appointmentId, {
			appointment_time: appointmentTime
		});

		return {
			appointment,
		};
	}
}