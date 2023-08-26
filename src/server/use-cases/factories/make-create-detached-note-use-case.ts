import { CreateDetachedNoteUseCase } from "../notes/detached/create-detached-note";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaDetachedNoteRepository } from "@/server/repositories/prisma/prisma-detached-note-repository";

export function MakeCreateDetachedNoteUseCase() {
	return new CreateDetachedNoteUseCase(
		new PrismaDetachedNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
	);
}
