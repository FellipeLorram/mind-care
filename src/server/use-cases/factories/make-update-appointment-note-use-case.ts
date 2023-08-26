import { PrismaAppointmentNoteRepository } from "@/server/repositories/prisma/prisma-appointment-note-repository";
import { UpdateAppointmentNoteUseCase } from "../notes/appointment/update-appointment-note";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";

export function MakeUpdateAppointmentNoteUseCase() {
	return new UpdateAppointmentNoteUseCase(
		new PrismaAppointmentNoteRepository(),
		new PrismaAppointmentRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
	);
}
