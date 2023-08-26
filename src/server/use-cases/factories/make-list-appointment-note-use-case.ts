import { PrismaAppointmentNoteRepository } from "@/server/repositories/prisma/prisma-appointment-note-repository";
import { ListAppointmentNotesUseCase } from "../notes/appointment/list-appointment-notes";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";

export function MakeListAppointmentNotesUseCase() {
	return new ListAppointmentNotesUseCase(
		new PrismaAppointmentNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
		new PrismaAppointmentRepository(),
	);
}
