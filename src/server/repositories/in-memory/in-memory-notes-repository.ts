/* eslint-disable @typescript-eslint/require-await */
import { type Note, type Prisma } from '@prisma/client';
import { type AppointmentNoteRepository } from '../appointment-note-repository';

export class InMemoryAppointmentNotesRepository implements AppointmentNoteRepository {
	private notes: Note[];

	constructor() {
		this.notes = [];
	}

	async create(data: Prisma.NoteUncheckedCreateInput) {
		const Note: Note = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: String(this.notes.length + 1),
		};

		this.notes.push(Note);

		return Note;
	}

	async update(id: string, Note: Prisma.NoteUncheckedUpdateInput) {
		const noteIndex = this.notes.findIndex((n) => n.id === id);

		if (noteIndex < 0) {
			throw new Error('Note not found');
		}

		this.notes[noteIndex] = {
			appointment_id: this.notes[noteIndex]!.appointment_id,
			content: Note.content as string ?? this.notes[noteIndex]!.content,
			createdAt: this.notes[noteIndex]!.createdAt,
			updatedAt: new Date(),
			patient_id: this.notes[noteIndex]!.patient_id as string,
			id: id,
		};

		return this.notes[noteIndex]!;
	}

	async list(appointmentId: string, page: number) {
		const notes = this.notes.filter((n) => n.appointment_id === appointmentId);

		const offset = (page - 1) * 20;
		const limit = 20;

		return notes.slice(offset, offset + limit);
	}

	async findById(id: string) {
		const Note = this.notes.find((n) => n.id === id);
		return Note ?? null;
	}

	async delete(id: string) {
		const noteIndex = this.notes.findIndex((n) => n.id === id);

		if (noteIndex < 0) {
			throw new Error('Note not found');
		}

		this.notes.splice(noteIndex, 1);
	}

	async listAll(patientId: string) {
		const notes = this.notes.filter((n) => n.patient_id === patientId);

		return notes;
	}
} 