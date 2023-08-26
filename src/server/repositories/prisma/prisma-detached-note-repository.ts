import { prisma } from '@/server/db';
import { type DetachedNoteRepository } from '../detached-note-repository';
import { type Prisma } from '@prisma/client';

export class PrismaDetachedNoteRepository implements DetachedNoteRepository {
	async findById(id: string) {
		const note = await prisma.detachedNote.findUnique({
			where: { id },
		});

		return note;
	}

	async create(data: Prisma.DetachedNoteUncheckedCreateInput) {
		const note = await prisma.detachedNote.create({
			data,
		});

		return note;
	}

	async update(id: string, data: Prisma.DetachedNoteUncheckedUpdateInput) {
		const note = await prisma.detachedNote.update({
			where: { id },
			data,
		});

		return note;
	}

	async list(patientId: string, page: number) {
		const notes = await prisma.detachedNote.findMany({
			where: { patient_id: patientId },
			skip: page * 10,
			take: 10,
		});

		return notes;
	}

	async delete(id: string) {
		await prisma.detachedNote.delete({
			where: { id },
		});
	}
}