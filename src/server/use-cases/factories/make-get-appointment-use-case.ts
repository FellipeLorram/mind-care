import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";
import { GetAppointmentUseCase } from "../appointments/get-appointment";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";

export function MakeGetAppointmentUseCase() {
	return new GetAppointmentUseCase(
		new PrismaAppointmentRepository(),
		new PrismaPatientRepository(),
		new PrismaUserRepository()
	);
}