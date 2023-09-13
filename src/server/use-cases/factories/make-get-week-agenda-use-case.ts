import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { GetWeekAgendaUseCase } from "../agenda/get-week-agenda";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";

export function MakeGetWeekAgendaUseCase() {
	return new GetWeekAgendaUseCase(
		new PrismaUserRepository(),
		new PrismaPatientRepository()
	);
}