import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";
import { CreateAppointmentUseCase } from "../appointments/create-appointment";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";

export function MakeCreateAppointmentUseCase() {
	return new CreateAppointmentUseCase(
		new PrismaPatientRepository(),
		new PrismaUserRepository(),
		new PrismaAppointmentRepository(),
	);
}