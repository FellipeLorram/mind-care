import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { InvalidPatientError } from '../errors/invalid-patient-error';
import { z } from 'zod';

export const GetAppointmentUseCaseRequest = z.object({
	userId: z.string(),
	patientId: z.string(),
	appointmentId: z.string(),
});

type GetAppointmentUseCaseRequest = z.infer<typeof GetAppointmentUseCaseRequest>;

export const GetAppointmentUseCaseResponse = z.object({
	appointment: z.object({
		id: z.string(),
		appointment_time: z.date(),
		patient_id: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
});

type GetAppointmentUseCaseResponse = z.infer<typeof GetAppointmentUseCaseResponse>;

export class GetAppointmentUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
	) { }

	async execute(data: GetAppointmentUseCaseRequest): Promise<GetAppointmentUseCaseResponse> {
		const appointment = await this.appointmentRepository.findById(data.appointmentId);
		const patient = await this.patientRepository.findById(data.patientId);
		const user = await this.userRepository.findById(data.userId);

		if (
			!user
			|| !patient
			|| !appointment
			|| user.id !== patient.user_id	
		) {
			throw new ResourceNotFoundError();
		}
		
		if (appointment.patient_id !== patient.id) {
			throw new InvalidPatientError();
		}

		return {
			appointment
		};
	}
}