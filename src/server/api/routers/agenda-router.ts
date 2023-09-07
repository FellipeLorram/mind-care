import { GetDayAgendaRequest } from "@/server/use-cases/agenda/list-day-agenda/get-day-agenda";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { MakeGetDayAgendaUseCase } from "@/server/use-cases/factories/make-get-days-agenda-use-case";

const getDayAgenda = MakeGetDayAgendaUseCase();

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
});