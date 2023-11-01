import { z } from 'zod';
import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { type Appointment } from '@prisma/client';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

export const UpdateAppointmentsUseCaseRequest = z.object({
	userId: z.string(),
	patientId: z.string(),
	appointment_id: z.string(),
	communication_effectiveness: z.number().optional(),
	engagement_level: z.number().optional(),
	progress: z.number().optional(),
	session_outcome: z.number().optional(),
	treatment_adherence: z.number().optional(),
	note: z.string().optional(),
});

type UpdateAppointmentsUseCaseRequest = z.infer<typeof UpdateAppointmentsUseCaseRequest>;

interface UpdateAppointmentsUseCaseResponse {
	appointment: Appointment;
}

export class UpdateAppointmentsUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository
	) { }

	async execute(data: UpdateAppointmentsUseCaseRequest): Promise<UpdateAppointmentsUseCaseResponse> {
		const { userId, patientId, appointment_id, ...rest } = data;

		const appointmentExists = await this.appointmentRepository.findById(appointment_id);
		const user = await this.usersRepository.findById(userId);
		const patient = await this.patientsRepository.findById(patientId);

		if (
			!appointmentExists
			|| !user
			|| !patient
		) {
			throw new ResourceNotFoundError();
		}

		const appointment = await this.appointmentRepository.update(appointment_id, {
			...rest,
		});

		return {
			appointment,
		};
	}
}