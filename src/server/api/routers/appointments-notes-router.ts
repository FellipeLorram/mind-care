import { MakeCreateAppointmentNoteUseCase } from "@/server/use-cases/factories/make-create-appointment-note-use-case";
import { CreateAppointmentNoteUseCaseRequest } from "@/server/use-cases/notes/appointment/create-appointment-note";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { MakeGetAppointmentNoteUseCase } from "@/server/use-cases/factories/make-get-appointment-note-use-case";
import { GetAppointmentNoteUseCaseRequest } from "@/server/use-cases/notes/appointment/get-appointment-note";
import { MakeListAppointmentNotesUseCase } from "@/server/use-cases/factories/make-list-appointment-note-use-case";
import { ListAppointmentNotesRequest } from "@/server/use-cases/notes/appointment/list-appointment-notes";
import { MakeUpdateAppointmentNoteUseCase } from "@/server/use-cases/factories/make-update-appointment-note-use-case";
import { UpdateAppointmentNoteUseCaseRequest } from "@/server/use-cases/notes/appointment/update-appointment-note";
import { MakeDeleteAppointmentNoteUseCase } from "@/server/use-cases/factories/make-delete-appointment-note-use-case";
import { DeleteAppointmentNoteUseCaseRequest } from "@/server/use-cases/notes/appointment/delete-appointment-note";

const createAppointmentNoteUseCase = MakeCreateAppointmentNoteUseCase();
const getAppointmentsNoteUseCase = MakeGetAppointmentNoteUseCase();
const listAppointmentsNotesUseCase = MakeListAppointmentNotesUseCase()
const updateAppointmentNoteUseCase = MakeUpdateAppointmentNoteUseCase();
const deleteAppointmentNoteUseCase = MakeDeleteAppointmentNoteUseCase();

export const appointmentsNotesRouter = createTRPCRouter({
	create: protectedProcedure
		.input(CreateAppointmentNoteUseCaseRequest)
		.mutation(async ({ input }) => {
			const note = await createAppointmentNoteUseCase.execute(input);

			return {
				note,
			};
		}),

	get: protectedProcedure
		.input(GetAppointmentNoteUseCaseRequest)
		.query(async ({ input }) => {
			const { appointmentNote } = await getAppointmentsNoteUseCase.execute(input);

			return {
				appointmentNote,
			};
		}),

	list: protectedProcedure
		.input(ListAppointmentNotesRequest)
		.query(async ({ input }) => {
			const { notes } = await listAppointmentsNotesUseCase.execute(input);

			return {
				notes,
			};
		}),

	update: protectedProcedure
		.input(UpdateAppointmentNoteUseCaseRequest)
		.mutation(async ({ input }) => {
			const { note } = await updateAppointmentNoteUseCase.execute(input);

			return {
				note,
			};
		}),

	delete: protectedProcedure
		.input(DeleteAppointmentNoteUseCaseRequest)
		.mutation(async ({ input }) => {
			await deleteAppointmentNoteUseCase.execute(input);

			return {
				success: true,
			};
		}),
});