import { type DetachedNote, type Prisma } from '@prisma/client';

export interface DetachedNoteRepository {
	findById(id: string): Promise<DetachedNote | null>;
	create(Note: Prisma.DetachedNoteUncheckedCreateInput): Promise<DetachedNote>;
	update(noteid: string, note: Prisma.DetachedNoteUncheckedUpdateInput): Promise<DetachedNote>;
	// delete(id: string): Promise<void>;
}
