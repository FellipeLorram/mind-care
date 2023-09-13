import { z } from "zod";

import { type UserRepository } from "@/server/repositories/user-repository";
import { type PatientRepository } from "@/server/repositories/patient-repository";

import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { daysOfWeek } from "@/lib/days-of-week";
import { type agenda } from "@/lib/agenda";

export const GetDayAgendaRequest = z.object({
	userId: z.string(),
	day: daysOfWeek,
});

type getDayAgendaRequest = z.infer<typeof GetDayAgendaRequest>;


interface GetDayAgendaResponse {
	agenda: agenda[]
}

export class GetDayAgendaUseCase {
	constructor(
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository
	) { }

	async execute(data: getDayAgendaRequest): Promise<GetDayAgendaResponse> {
		const user = await this.usersRepository.findById(data.userId);
		if (!user) {
			throw new ResourceNotFoundError();
		}

		const patients = await this.patientsRepository.listByUserIdAndAppointmentDay(data.userId, data.day);

		const agenda = patients.map(patient => {
			return {
				patient: {
					id: patient.id,
					name: patient.name,
				},
				appointment: {
					from: patient.appointment_from,
					to: patient.appointment_to,
					day: patient.appointment_day,
				},
			}
		});

		return {
			agenda,
		};
	}
}
