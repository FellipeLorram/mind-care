import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";

import { CreateAppointmentUseCaseRequest } from "@/server/use-cases/appointments/create-appointment";
import { DeleteAppointmentUseCaseRequest } from "@/server/use-cases/appointments/delete-appointment";
import { GetAppointmentUseCaseRequest } from "@/server/use-cases/appointments/get-appointment";
import { ListAppointmentsUseCaseRequest } from "@/server/use-cases/appointments/list-appointments";
import { UpdateAppointmentsUseCaseRequest } from "@/server/use-cases/appointments/update-appointment";
import { MakeCreateAppointmentUseCase } from "@/server/use-cases/factories/make-create-appointment-use-case";
import { MakeDeleteAppointmentUseCase } from "@/server/use-cases/factories/make-delete-appointment-use-case";
import { MakeGetAppointmentUseCase } from "@/server/use-cases/factories/make-get-appointment-use-case";
import { MakeListAppointmentsUseCase } from "@/server/use-cases/factories/make-list-appointments-use-case";
import { MakeUpdateAppointmentsUseCase } from "@/server/use-cases/factories/make-update-appointment-use-case";

const createAppointmentUseCase = MakeCreateAppointmentUseCase();
const deleteAppointmentUseCase = MakeDeleteAppointmentUseCase();
const getAppointmentUseCase = MakeGetAppointmentUseCase();
const listAppointmentUseCase = MakeListAppointmentsUseCase();
const updateAppointmentUseCase = MakeUpdateAppointmentsUseCase();

export const appointmentsRouter = createTRPCRouter({
	create: protectedProcedure
		.input(CreateAppointmentUseCaseRequest.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			const appointment = await createAppointmentUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});

			return appointment
			
		}),

	delete: protectedProcedure
		.input(DeleteAppointmentUseCaseRequest.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			await deleteAppointmentUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});
		}),

	get: protectedProcedure
		.input(GetAppointmentUseCaseRequest.omit({ userId: true }))
		.query(async ({ input, ctx }) => {
			const appointment = await getAppointmentUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});

			return appointment
		}),

	list: protectedProcedure
		.input(ListAppointmentsUseCaseRequest.omit({ userId: true }))
		.query(async ({ input, ctx }) => {
			const appointments = await listAppointmentUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});

			return appointments
		}),

	update: protectedProcedure
		.input(UpdateAppointmentsUseCaseRequest.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			const appointment = await updateAppointmentUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});

			return appointment
		}),
});
