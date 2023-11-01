import { type AppointmentNoteRepository } from "@/server/repositories/appointment-note-repository";
import { type PatientRepository } from "@/server/repositories/patient-repository";
import { type UserRepository } from "@/server/repositories/user-repository";
import { type Note } from "@prisma/client";
import { z } from "zod";
import { InavalidCredentialsError } from "../../errors/invalid-credentials-error";

export const ListAllAppointmentsNotesUseCaseRequest = z.object({
	patient_id: z.string(),
	user_id: z.string(),
});

export type ListAllAppointmentsNotesUseCaseRequest = z.infer<typeof ListAllAppointmentsNotesUseCaseRequest>;

interface ListAllAppointmentsNotesUseCaseResponse {
	notes: Note[];
}

export class ListAllAppointmentsNotesUseCase {
	constructor(
		private appointmentsNotesRepository: AppointmentNoteRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository,
	) { }

	async execute({ patient_id, user_id }: ListAllAppointmentsNotesUseCaseRequest): Promise<ListAllAppointmentsNotesUseCaseResponse> {
		const patientExists = await this.patientsRepository.findById(patient_id);
		const userExists = await this.usersRepository.findById(user_id);

		if (!patientExists || !userExists) {
			throw new InavalidCredentialsError();
		}

		const notes = await this.appointmentsNotesRepository.listAll(patient_id);

		return {
			notes,
		};
	}
}