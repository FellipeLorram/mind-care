import { GetDayAgendaRequest } from "@/server/use-cases/agenda/get-day-agenda";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { MakeGetDayAgendaUseCase } from "@/server/use-cases/factories/make-get-days-agenda-use-case";
import { MakeGetWeekAgendaUseCase } from "@/server/use-cases/factories/make-get-week-agenda-use-case";

const getDayAgenda = MakeGetDayAgendaUseCase();
const getWeekAgenda = MakeGetWeekAgendaUseCase();

export const agendaRouter = createTRPCRouter({
	getDaysAgenda: protectedProcedure
		.input(GetDayAgendaRequest.omit({ userId: true }))
		.query(async ({ input, ctx }) => {
			const { agenda } = await getDayAgenda.execute({
				...input,
				userId: ctx.session.user.id,
			});

			return {
				agenda,
			};
		}),

	getWeekAgenda: protectedProcedure
		.query(async ({ ctx }) => {
			const agenda = await getWeekAgenda.execute({
				userId: ctx.session.user.id,
			});

			return agenda;
		}),
});