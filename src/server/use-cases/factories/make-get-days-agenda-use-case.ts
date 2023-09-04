import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { GetDayAgendaUseCase } from "../agenda/list-day-agenda/get-day-agenda";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";

export function MakeGetDayAgendaUseCase() {
	return new GetDayAgendaUseCase(
		new PrismaUserRepository(),
		new PrismaPatientRepository()
	);
}