import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { type Note } from '@prisma/client';
import { type AppointmentNoteRepository } from '@/server/repositories/appointment-note-repository';
import { type UserRepository } from '@/server/repositories/user-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';

interface UpdateAppointmentNoteUseCaseRequest {
	appointmentId: string;
	patientId: string;
	userId: string;
	noteId: string;
	content: string;
}

interface UpdateAppointmentNoteUseCaseResponse {
	note: Note;
}

export class UpdateAppointmentNoteUseCase {
	constructor(
		private noteRepository: AppointmentNoteRepository,
		private appointmentRepository: AppointmentRepository,
		private usersRepository: UserRepository
	) { }

	async execute(data: UpdateAppointmentNoteUseCaseRequest): Promise<UpdateAppointmentNoteUseCaseResponse> {
		const appointment = await this.appointmentRepository.findById(data.appointmentId);
		const noteExists = await this.noteRepository.findById(data.noteId);
		const user = await this.usersRepository.findById(data.userId);

		if (!appointment || !noteExists || !user) {
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
