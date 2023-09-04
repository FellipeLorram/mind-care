import { GetDayAgendaRequest } from "@/server/use-cases/agenda/list-day-agenda/get-day-agenda";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { MakeGetDayAgendaUseCase } from "@/server/use-cases/factories/make-get-days-agenda-use-case";

const getDayAgenda = MakeGetDayAgendaUseCase();

export const agendaRouter = createTRPCRouter({
	getDaysAgenda: protectedProcedure
		.input(GetDayAgendaRequest)
		.query(async ({ input }) => {
			const { agenda } = await getDayAgenda.execute(input);

			console.log('new request');
			console.log(input.day);

			return {
				agenda,
			};
		}),
});