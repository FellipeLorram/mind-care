import { type AppointmentNoteRepository } from '@/server/repositories/appointment-note-repository';
import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { InavalidPageError } from '@/server/use-cases/errors/invalid-page-error';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { type Note } from '@prisma/client';

interface ListAppointmentNotesRequest {
	userId: string;
	appointmentId: string;
	patientId: string;
	page: number;
}

interface ListAppointmentNotesResponse {
	notes: Note[];
}

export class ListAppointmentNotesUseCase {
	constructor(
		private AppointmentNotesRepository: AppointmentNoteRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository,
		private AppointmentRepository: AppointmentRepository,
	) { }
	async execute(data: ListAppointmentNotesRequest): Promise<ListAppointmentNotesResponse> {
		if (data.page < 1) {
			throw new InavalidPageError();
		}

		const user = await this.usersRepository.findById(data.userId);
		const patient = await this.patientsRepository.findById(data.patientId);
		const appointment = await this.AppointmentRepository.findById(data.appointmentId);

		if (!user || !patient || !appointment) {
			throw new ResourceNotFoundError();
		}

		const notes = await this.AppointmentNotesRepository.list(
			data.appointmentId,
			data.page
		);

		return {
			notes,
		};
	}
}