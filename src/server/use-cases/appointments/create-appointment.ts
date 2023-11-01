import { z } from 'zod';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { type Appointment } from '@prisma/client';
import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

export const CreateAppointmentUseCaseRequest = z.object({
	patient_id: z.string(),
	userId: z.string(),
	modality: z.enum(['inPerson', 'online', 'hibrid']),
	duration: z.number(),
	communication_effectiveness: z.number().optional(),
	engagement_level: z.number().optional(),
	progress: z.number().optional(),
	session_outcome: z.number().optional(),
	treatment_adherence: z.number().optional(),
	note: z.string().optional(),
});

type CreateAppointmentUseCaseRequest = z.infer<typeof CreateAppointmentUseCaseRequest>;

interface CreateAppointmentUseCaseResponse {
	appointment: Appointment;
}

export class CreateAppointmentUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
		private appointmentRepository: AppointmentRepository,
	) { }

	async execute(data: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
		const { userId, ...rest } = data;
		const user = await this.userRepository.findById(userId);
		const patient = await this.patientRepository.findById(data.patient_id);

		if (!user || !patient || user.id !== patient.user_id) {
			throw new ResourceNotFoundError();
		}

		const appointment = await this.appointmentRepository.create({
			...rest,
		});

		return {
			appointment,
		};
	}
}
