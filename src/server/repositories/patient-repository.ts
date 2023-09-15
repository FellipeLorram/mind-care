import { type daysOfWeekType } from '@/lib/days-of-week';
import { type Patient, type Prisma } from '@prisma/client';

type ListResponse = {
	patients: Patient[];
	count: number;
};

export interface PatientRepository {
	findById(id: string): Promise<Patient | null>;
	create(patient: Prisma.PatientUncheckedCreateInput): Promise<Patient>;
	update(patientid: string, patient: Prisma.PatientUncheckedUpdateInput): Promise<Patient>;
	delete(id: string): Promise<void>;
	list(userId: string, page: number, query?: string): Promise<ListResponse>;
	listByUserIdAndAppointmentDay(userId: string, day: daysOfWeekType): Promise<Patient[]>;
}
