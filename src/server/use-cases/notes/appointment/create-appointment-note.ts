import { type Note } from '@prisma/client';
import { type UserRepository } from '@/server/repositories/user-repository';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { type AppointmentNoteRepository } from '@/server/repositories/appointment-note-repository';
import { type AppointmentRepository } from '@/server/repositories/appointment-repository';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';
import { z } from 'zod';

export const CreateAppointmentNoteUseCaseRequest = z.object({
	content: z.string(),
	patientId: z.string(),
	appointmentId: z.string(),
	userId: z.string(),
});

type CreateAppointmentNoteUseCaseRequestType = z.infer<typeof CreateAppointmentNoteUseCaseRequest>;

interface CreateAppointmentNoteUseCaseResponse {
	note: Note;
}

export class CreateAppointmentNoteUseCase {
	constructor(
		private notesRepository: AppointmentNoteRepository,
		private userRepository: UserRepository,
		private patientRepository: PatientRepository,
		private appointmentRepository: AppointmentRepository,
	) { }

	async execute(data: CreateAppointmentNoteUseCaseRequestType): Promise<CreateAppointmentNoteUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);
		const appointment = await this.appointmentRepository.findById(data.appointmentId);

		if (!user || !patient || !appointment) {
			throw new ResourceNotFoundError();
		}

		const note = await this.notesRepository.create({
			content: data.content,
			appointment_id: data.appointmentId,
			patient_id: data.patientId,
		});

		return {
			note
		};
	}
}
