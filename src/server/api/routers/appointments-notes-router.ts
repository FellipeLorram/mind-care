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
import { ListAllAppointmentsNotesUseCaseRequest } from "@/server/use-cases/notes/appointment/list-all-appointments-notes";
import { MakeListAllAppointmentNotesUseCase } from "@/server/use-cases/factories/make-list-all-appointments-notes-use-case";

const createAppointmentNoteUseCase = MakeCreateAppointmentNoteUseCase();
const getAppointmentsNoteUseCase = MakeGetAppointmentNoteUseCase();
const listAppointmentsNotesUseCase = MakeListAppointmentNotesUseCase()
const updateAppointmentNoteUseCase = MakeUpdateAppointmentNoteUseCase();
const deleteAppointmentNoteUseCase = MakeDeleteAppointmentNoteUseCase();
const listAllAppointmentsNotesUseCase = MakeListAllAppointmentNotesUseCase();

export const appointmentsNotesRouter = createTRPCRouter({
	create: protectedProcedure
		.input(CreateAppointmentNoteUseCaseRequest.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			const note = await createAppointmentNoteUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});

			return {
				note,
			};
		}),

	get: protectedProcedure
		.input(GetAppointmentNoteUseCaseRequest.omit({ userId: true }))
		.query(async ({ input, ctx }) => {
			const { appointmentNote } = await getAppointmentsNoteUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});

			return {
				appointmentNote,
			};
		}),

	list: protectedProcedure
		.input(ListAppointmentNotesRequest.omit({ userId: true }))
		.query(async ({ input, ctx }) => {
			const { notes } = await listAppointmentsNotesUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});

			return {
				notes,
			};
		}),

	update: protectedProcedure
		.input(UpdateAppointmentNoteUseCaseRequest.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			const { note } = await updateAppointmentNoteUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});

			return {
				note,
			};
		}),

	delete: protectedProcedure
		.input(DeleteAppointmentNoteUseCaseRequest.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			await deleteAppointmentNoteUseCase.execute({
				...input,
				userId: ctx.session.user.id
			});

			return {
				success: true,
			};
		}),

	listAll: protectedProcedure
		.input(ListAllAppointmentsNotesUseCaseRequest.omit({ user_id: true }))
		.query(async ({ input, ctx }) => {
			const { notes } = await listAllAppointmentsNotesUseCase.execute({
				...input,
				user_id: ctx.session.user.id
			});

			return notes

		}),
});