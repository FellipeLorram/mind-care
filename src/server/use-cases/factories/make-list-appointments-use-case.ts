import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { ListAppointmentsUseCase } from "../appointments/list-appointments";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";

export function MakeListAppointmentsUseCase() {
	return new ListAppointmentsUseCase(
		new PrismaAppointmentRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository()
	);
}