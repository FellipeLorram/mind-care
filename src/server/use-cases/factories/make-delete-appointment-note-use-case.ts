import { PrismaAppointmentNoteRepository } from "@/server/repositories/prisma/prisma-appointment-note-repository";
import { DeleteAppointmentNoteUseCase } from "../notes/appointment/delete-appointment-note";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";

export function MakeDeleteAppointmentNoteUseCase() {
	return new DeleteAppointmentNoteUseCase(
		new PrismaAppointmentNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
		new PrismaAppointmentRepository(),
	);
}
