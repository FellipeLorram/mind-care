import { GetDetachedNoteUseCase } from "../notes/detached/get-detached-note";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaDetachedNoteRepository } from "@/server/repositories/prisma/prisma-detached-note-repository";

export function MakeGetDetachedNotesUseCase() {
	return new GetDetachedNoteUseCase(
		new PrismaDetachedNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
	);
}
