import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { InvalidPatientError } from '../errors/invalid-patient-error';
import { z } from 'zod';

export const DeleteAppointmentUseCaseRequest = z.object({
	userId: z.string(),
	patientId: z.string(),
	appointmentId: z.string(),
});

type DeleteAppointmentUseCaseRequest = z.infer<typeof DeleteAppointmentUseCaseRequest>;

export class DeleteAppointmentUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
	) { }

	async execute({ userId, appointmentId, patientId }: DeleteAppointmentUseCaseRequest): Promise<void> {
		const AppointmentExists = await this.appointmentRepository.findById(appointmentId);
		const user = await this.userRepository.findById(userId);
		const patient = await this.patientRepository.findById(patientId);

		if (
			!AppointmentExists
			|| !user
			|| !patient
			|| user.id !== patient.user_id
		) {
			throw new ResourceNotFoundError();
		}

		if (AppointmentExists.patient_id !== patientId) {
			throw new InvalidPatientError();
		}

		await this.appointmentRepository.delete(appointmentId);
	}
}