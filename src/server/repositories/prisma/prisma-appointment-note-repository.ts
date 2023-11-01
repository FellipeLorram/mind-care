import { prisma } from '@/server/db';
import { type AppointmentNoteRepository } from '../appointment-note-repository';
import { type Prisma } from '@prisma/client';

export class PrismaAppointmentNoteRepository implements AppointmentNoteRepository {
	async findById(id: string) {
		const note = await prisma.note.findUnique({
			where: {
				id,
			},
		});

		return note;
	}
	async create(data: Prisma.NoteUncheckedCreateInput) {
		const note = await prisma.note.create({
			data,
		});

		return note;
	}

	async update(id: string, data: Prisma.NoteUncheckedUpdateInput) {
		const note = await prisma.note.update({
			where: {
				id,
			},
			data,
		});

		return note;
	}

	async list(appointmentId: string, page: number) {
		const notes = await prisma.note.findMany({
			where: {
				appointment_id: appointmentId,
			},
			skip: (page - 1) * 10,
			take: 10,
			orderBy: {
				createdAt: 'desc',
			},
		});

		return notes;
	}

	async delete(id: string) {
		await prisma.note.delete({
			where: {
				id,
			},
		});
	}

	listAll(patientId: string) {
		const notes = prisma.note.findMany({
			where: {
				patient_id: patientId,
			},
		});

		return notes;
	}
}