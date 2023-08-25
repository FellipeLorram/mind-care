import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { UpdateAppointmentsUseCase } from "../appointments/update-appointment";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaAppointmentRepository } from "@/server/repositories/prisma/prisma-appointment-repository";

export function MakeUpdateAppointmentsUseCase() {
	return new UpdateAppointmentsUseCase(
		new PrismaAppointmentRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository()
	);
}