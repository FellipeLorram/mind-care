import { DeleteDetachedNoteUseCase } from "../notes/detached/delete-detached-note";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaDetachedNoteRepository } from "@/server/repositories/prisma/prisma-detached-note-repository";

export function MakeDeleteDetachedNoteUseCase() {
	return new DeleteDetachedNoteUseCase(
		new PrismaDetachedNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
	);
}
