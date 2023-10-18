import { MakeDeleteDetachedNoteUseCase } from "@/server/use-cases/factories/make-delete-detached-note-use-case";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { MakeCreateDetachedNoteUseCase } from "@/server/use-cases/factories/make-create-detached-note-use-case";
import { MakeUpdateDetachedNoteUseCase } from "@/server/use-cases/factories/make-update-detached-note-use-case";
import { CreateDetachedNoteUseCaseRequest } from "@/server/use-cases/notes/detached/create-detached-note";
import { UpdateDetachedNoteUseCaseRequest } from "@/server/use-cases/notes/detached/update-detached-note";
import { DeleteDetachedNoteUseCaseRequest } from "@/server/use-cases/notes/detached/delete-detached-note";
import { MakeListDetachedNotesUseCase } from "@/server/use-cases/factories/make-list-detached-note-use-case";
import { MakeGetDetachedNotesUseCase } from "@/server/use-cases/factories/make-get-detached-note-use-case";
import { ListDetachedNoteUseCaseRequest } from "@/server/use-cases/notes/detached/list-detached-note";
import { GetDetachedNoteUseCaseRequest } from "@/server/use-cases/notes/detached/get-detached-note";

const createDetachedNoteUseCase = MakeCreateDetachedNoteUseCase();
const updateDetachedNoteUseCase = MakeUpdateDetachedNoteUseCase();
const deleteDetachedNoteUseCase = MakeDeleteDetachedNoteUseCase();
const listDetachedNotesUseCase = MakeListDetachedNotesUseCase();
const getDetachedNotesUseCase = MakeGetDetachedNotesUseCase();

export const detachedNotesRouter = createTRPCRouter({
	create: protectedProcedure
		.input(CreateDetachedNoteUseCaseRequest.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			const note = await createDetachedNoteUseCase.execute({
				...input,
				userId: ctx.session!.user.id,
			});

			return note
		}),

	update: protectedProcedure
		.input(UpdateDetachedNoteUseCaseRequest.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			const { note } = await updateDetachedNoteUseCase.execute({
				...input,
				userId: ctx.session!.user.id,
			});

			return note;
		}),

	delete: protectedProcedure
		.input(DeleteDetachedNoteUseCaseRequest.omit({ userId: true }))
		.mutation(async ({ input, ctx }) => {
			await deleteDetachedNoteUseCase.execute({
				...input,
				userId: ctx.session!.user.id,
			});
		}),

	list: protectedProcedure
		.input(ListDetachedNoteUseCaseRequest.omit({ userId: true }))
		.query(async ({ input, ctx }) => {
			const { notes } = await listDetachedNotesUseCase.execute({
				...input,
				userId: ctx.session!.user.id,
			});

			return notes
		}),

	get: protectedProcedure
		.input(GetDetachedNoteUseCaseRequest.omit({ userId: true }))
		.query(async ({ input, ctx }) => {
			const { note } = await getDetachedNotesUseCase.execute({
				...input,
				userId: ctx.session!.user.id,
			});

			return note
		}),
});