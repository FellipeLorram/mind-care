import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { InavalidPageError } from '../errors/invalid-page-error';
import { z } from 'zod';

export const ListAppointmentsUseCaseRequest = z.object({
	userId: z.string(),
	patientId: z.string(),
	page: z.number().min(1),
});

type ListAppointmentsUseCaseRequest = z.infer<typeof ListAppointmentsUseCaseRequest>;

const ListAppointmentsUseCaseResponse = z.object({
	appointments: z.array(z.object({
		id: z.string(),
		createdAt: z.date(),
		patient_id: z.string(),
		updatedAt: z.date(),
	})),
});

type ListAppointmentsUseCaseResponse = z.infer<typeof ListAppointmentsUseCaseResponse>;

export class ListAppointmentsUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository
	) { }

	async execute(data: ListAppointmentsUseCaseRequest): Promise<ListAppointmentsUseCaseResponse> {
		if(data.page < 1) throw new InavalidPageError();

		const user = await this.usersRepository.findById(data.userId);
		const patient = await this.patientsRepository.findById(data.patientId);
		const appointments = await this.appointmentRepository.list(data.patientId, data.page);

		if (
			!user
			|| !patient
		) {
			throw new ResourceNotFoundError();
		}


		return {
			appointments
		};
	}
}