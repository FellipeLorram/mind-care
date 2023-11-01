import { PrismaAppointmentNoteRepository } from "@/server/repositories/prisma/prisma-appointment-note-repository";
import { ListAllAppointmentsNotesUseCase } from "../notes/appointment/list-all-appointments-notes";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";

export function MakeListAllAppointmentNotesUseCase() {
	return new ListAllAppointmentsNotesUseCase(
		new PrismaAppointmentNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
	);
}
