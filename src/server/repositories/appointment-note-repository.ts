import { type Note, type Prisma } from '@prisma/client';

export interface AppointmentNoteRepository {
	findById(id: string): Promise<Note | null>;
	create(data: Prisma.NoteUncheckedCreateInput): Promise<Note>;
	update(noteid: string, data: Prisma.NoteUncheckedUpdateInput): Promise<Note>;
	// TODO: Implement delete
	// delete(id: string): Promise<void>;
	list(appointmentId: string, page: number): Promise<Note[]>;
}
