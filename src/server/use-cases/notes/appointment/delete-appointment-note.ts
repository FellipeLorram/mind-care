import { type UserRepository } from '@/server/repositories/user-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type AppointmentNoteRepository } from '@/server/repositories/appointment-note-repository';
import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { z } from 'zod';

export const DeleteAppointmentNoteUseCaseRequest = z.object({
	patientId: z.string(),
	appointmentId: z.string(),
	userId: z.string(),
	noteId: z.string(),
});

type DeleteAppointmentNoteUseCaseRequestType = z.infer<typeof DeleteAppointmentNoteUseCaseRequest>;

export class DeleteAppointmentNoteUseCase {
	constructor(
		private notesRepository: AppointmentNoteRepository,
		private userRepository: UserRepository,
		private patientRepository: PatientRepository,
		private appointmentRepository: AppointmentRepository,
	) { }

	async execute(data: DeleteAppointmentNoteUseCaseRequestType): Promise<void> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);
		const appointment = await this.appointmentRepository.findById(data.appointmentId);
		const noteExists = await this.notesRepository.findById(data.noteId);

		if (
			!user
			|| !patient
			|| !appointment
			|| !noteExists
		) {
			throw new ResourceNotFoundError();
		}

		await this.notesRepository.delete(data.noteId);
	}
}
