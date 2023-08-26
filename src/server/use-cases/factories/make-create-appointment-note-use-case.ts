import { PrismaAppointmentNoteRepository } from "@/server/repositories/prisma/prisma-appointment-note-repository";
import { CreateAppointmentNoteUseCase } from "../notes/appointment/create-appointment-note";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";

export function MakeCreateAppointmentNoteUseCase() {
	return new CreateAppointmentNoteUseCase(
		new PrismaAppointmentNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
		new PrismaAppointmentRepository(),
	);
}
