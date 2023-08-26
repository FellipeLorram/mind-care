import { UpdateDetachedNoteUseCase } from "../notes/detached/update-detached-note";
import { PrismaUserRepository } from "@/server/repositories/prisma/prisma-user-repository";
import { PrismaPatientRepository } from "@/server/repositories/prisma/prisma-patient-repository";
import { PrismaDetachedNoteRepository } from "@/server/repositories/prisma/prisma-detached-note-repository";

export function MakeUpdateDetachedNoteUseCase() {
	return new UpdateDetachedNoteUseCase(
		new PrismaDetachedNoteRepository(),
		new PrismaUserRepository(),
		new PrismaPatientRepository(),
	);
}
