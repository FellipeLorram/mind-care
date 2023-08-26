import { type AppointmentNoteRepository } from '@/server/repositories/appointment-note-repository';
import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { type Note } from '@prisma/client';
import { z } from 'zod';

// interface GetAppointmentNoteUseCaseRequest {
// 	appointmentNoteId: string;
// 	userId: string;
// 	patientId: string;
// 	appointmentId: string;
// }

export const GetAppointmentNoteUseCaseRequest = z.object({
	appointmentNoteId: z.string(),
	userId: z.string(),
	patientId: z.string(),
	appointmentId: z.string(),
});

type GetAppointmentNoteUseCaseRequestType = z.infer<typeof GetAppointmentNoteUseCaseRequest>;

interface GetAppointmentNoteUseCaseResponse {
	appointmentNote: Note;
}

export class GetAppointmentNoteUseCase {
	constructor(
		private appointmentNotesRepository: AppointmentNoteRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository,
		private AppointmentRepository: AppointmentRepository,
	) { }

	async execute({
		appointmentNoteId,
		appointmentId,
		patientId,
		userId
	}: GetAppointmentNoteUseCaseRequestType): Promise<GetAppointmentNoteUseCaseResponse> {
		const appointmentNote = await this.appointmentNotesRepository.findById(appointmentNoteId);
		const user = await this.usersRepository.findById(userId);
		const patient = await this.patientsRepository.findById(patientId);
		const appointment = await this.AppointmentRepository.findById(appointmentId);

		if (
			!appointmentNote
			|| !user
			|| !patient
			|| !appointment
		) {
			throw new ResourceNotFoundError();
		}

		return {
			appointmentNote
		};
	}
}