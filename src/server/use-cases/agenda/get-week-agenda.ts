import { type agenda } from "@/lib/agenda";
import { type daysOfWeekType } from "@/lib/days-of-week";
import { type PatientRepository } from "@/server/repositories/patient-repository";
import { type UserRepository } from "@/server/repositories/user-repository";
import { z } from "zod";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export const getWeekAgendaUseCaseRequest = z.object({
	userId: z.string(),
});

export type getWeekAgendaUseCaseRequestType = z.infer<typeof getWeekAgendaUseCaseRequest>;

type getWeekAgendaUseCaseResponse = {
	agenda: Record<daysOfWeekType, agenda[]>
}

export class GetWeekAgendaUseCase {
	constructor(
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository
	) { }

	async execute(data: getWeekAgendaUseCaseRequestType): Promise<getWeekAgendaUseCaseResponse> {
		const user = await this.usersRepository.findById(data.userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const daysOfWeek: daysOfWeekType[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

		const agendaArray = await Promise.all(daysOfWeek.map(day => this.getDayAgenda(data.userId, day)));

		const agenda = agendaArray.reduce((acc, curr, index) => {
			acc[daysOfWeek[index]!] = curr;
			return acc;
		}, {} as Record<daysOfWeekType, agenda[]>);

		return {
			agenda,
		};
	}

	private async getDayAgenda(userId: string, day: daysOfWeekType): Promise<agenda[]> {
		const patients = await this.patientsRepository.listByUserIdAndAppointmentDay(userId, day);

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

		return agenda
	}
}