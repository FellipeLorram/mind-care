import { ListDetachedNoteUseCase } from "../notes/detached/list-detached-note";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaDetachedNoteRepository } from "@/server/repositories/prisma/prisma-detached-note-repository";

export function MakeListDetachedNotesUseCase() {
	return new ListDetachedNoteUseCase(
		new PrismaDetachedNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
	);
}
