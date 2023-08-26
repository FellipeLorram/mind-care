import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { type Note } from '@prisma/client';
import { type AppointmentNoteRepository } from '@/server/repositories/appointment-note-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { z } from 'zod';

export const UpdateAppointmentNoteUseCaseRequest = z.object({
	appointmentId: z.string(),
	patientId: z.string(),
	userId: z.string(),
	noteId: z.string(),
	content: z.string(),
});

type UpdateAppointmentNoteUseCaseRequest = z.infer<typeof UpdateAppointmentNoteUseCaseRequest>;

interface UpdateAppointmentNoteUseCaseResponse {
	note: Note;
}

export class UpdateAppointmentNoteUseCase {
	constructor(
		private noteRepository: AppointmentNoteRepository,
		private appointmentRepository: AppointmentRepository,
		private usersRepository: UserRepository,
		private patientRepository: PatientRepository,
	) { }

	async execute(data: UpdateAppointmentNoteUseCaseRequest): Promise<UpdateAppointmentNoteUseCaseResponse> {
		const appointment = await this.appointmentRepository.findById(data.appointmentId);
		const noteExists = await this.noteRepository.findById(data.noteId);
		const user = await this.usersRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);

		if (
			!appointment
			|| !noteExists
			|| !user
			|| !patient
		) {
			throw new ResourceNotFoundError();
		}

		const note = await this.noteRepository.update(data.noteId, {
			content: data.content,
		});

		return {
			note
		};
	}
}
