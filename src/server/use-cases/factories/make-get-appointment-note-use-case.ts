import { PrismaAppointmentNoteRepository } from "@/server/repositories/prisma/prisma-appointment-note-repository";
import { GetAppointmentNoteUseCase } from "../notes/appointment/get-appointment-note";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";

export function MakeGetAppointmentNoteUseCase() {
	return new GetAppointmentNoteUseCase(
		new PrismaAppointmentNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
		new PrismaAppointmentRepository(),
	);
}
