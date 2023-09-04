import { type daysOfWeek } from '@/lib/days-of-week';
import { type Patient, type Prisma } from '@prisma/client';

export interface PatientRepository {
	findById(id: string): Promise<Patient | null>;
	create(patient: Prisma.PatientUncheckedCreateInput): Promise<Patient>;
	update(patientid: string, patient: Prisma.PatientUncheckedUpdateInput): Promise<Patient>;
	delete(id: string): Promise<void>;
	list(userId: string, page: number, query: string): Promise<Patient[]>;
	listByUserIdAndAppointmentDay(userId: string, day: daysOfWeek): Promise<Patient[]>;
}
