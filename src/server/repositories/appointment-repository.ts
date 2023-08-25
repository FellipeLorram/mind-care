import { type Appointment, type Prisma } from '@prisma/client';

export interface AppointmentRepository {
	findById(id: string): Promise<Appointment | null>;
	create(Note: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>;
	delete(id: string): Promise<void>;
	list(patientId: string, page: number): Promise<Appointment[]>;
	update(id: string, data: Prisma.AppointmentUncheckedUpdateInput): Promise<Appointment>;
}
