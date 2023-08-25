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
	createAppointment: protectedProcedure
		.input(CreateAppointmentUseCaseRequest)
		.mutation(async ({ input }) => {
			const appointment = await createAppointmentUseCase.execute(input);

			return {
				appointment,
			};
		}),

	deleteAppointment: protectedProcedure
		.input(DeleteAppointmentUseCaseRequest)
		.mutation(async ({ input }) => {
			await deleteAppointmentUseCase.execute(input);
		}),

	getAppointment: protectedProcedure
		.input(GetAppointmentUseCaseRequest)
		.query(async ({ input }) => {
			const appointment = await getAppointmentUseCase.execute(input);

			return {
				appointment,
			};
		}),

	listAppointments: protectedProcedure
		.input(ListAppointmentsUseCaseRequest)
		.query(async ({ input }) => {
			const appointments = await listAppointmentUseCase.execute(input);

			return {
				appointments,
			};
		}),
		
	updateAppointment: protectedProcedure
		.input(UpdateAppointmentsUseCaseRequest)
		.mutation(async ({ input }) => {
			const appointment = await updateAppointmentUseCase.execute(input);

			return {
				appointment,
			};
		}),
});
