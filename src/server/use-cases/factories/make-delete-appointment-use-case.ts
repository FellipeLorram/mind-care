import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";
import { DeleteAppointmentUseCase } from "../appointments/delete-appointment";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";

export function MakeDeleteAppointmentUseCase() {
	return new DeleteAppointmentUseCase(
		new PrismaAppointmentRepository(),
		new PrismaPatientRepository(),
		new PrismaUserRepository(),
	);
}