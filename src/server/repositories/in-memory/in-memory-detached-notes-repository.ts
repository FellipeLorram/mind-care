/* eslint-disable @typescript-eslint/require-await */
import { type DetachedNote, type Prisma } from '@prisma/client';
import { type DetachedNoteRepository } from '../detached-note-repository';

export class InMemoryDetachedNotesRepository implements DetachedNoteRepository {
	private notes: DetachedNote[];

	constructor() {
		this.notes = [];
	}

	async create(data: Prisma.DetachedNoteUncheckedCreateInput) {
		const Note: DetachedNote = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: String(this.notes.length + 1),
		};

		this.notes.push(Note);

		return Note;
	}

	async update(id: string, data: Prisma.DetachedNoteUncheckedUpdateInput) {
		const NoteIndex = this.notes.findIndex((Note) => Note.id === id);

		if (NoteIndex < 0) {
			throw new Error('Note not found');
		}

		const Note: DetachedNote = {
			content: data.content as string ?? this.notes[NoteIndex]!.content,
			createdAt: this.notes[NoteIndex]!.createdAt,
			updatedAt: new Date(),
			id: id,
			patient_id: this.notes[NoteIndex]!.patient_id,
		};

		this.notes[NoteIndex] = Note;

		return Note;
	}

	// async delete(id: string) {
	// 	const NoteIndex = this.Notes.findIndex((Note) => Note.id === id);

	// 	if (NoteIndex < 0) {
	// 		throw new Error('Note not found');
	// 	}

	// 	this.Notes.splice(NoteIndex, 1);
	// }

	async findById(id: string) {
		const note = this.notes.find((n) => n.id === id);
		return note ?? null;
	}
} 