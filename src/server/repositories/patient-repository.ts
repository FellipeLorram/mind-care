import { type daysOfWeekType } from '@/lib/days-of-week';
import { type Phone, type Patient, type Prisma } from '@prisma/client';

// Define a new type that includes the 'phones' relation
export type PatientWithPhones = Patient & {
  phones: Phone[]; // Assuming 'Phone' is the related model
};

type ListResponse = {
  patients: Patient[];
  count: number;
};

export interface PatientRepository {
  findById(id: string): Promise<PatientWithPhones | null>; // Use the new type here
  create(patient: Prisma.PatientUncheckedCreateInput): Promise<Patient>;
  update(patientid: string, patient: Prisma.PatientUncheckedUpdateInput): Promise<Patient>;
  delete(id: string): Promise<void>;
  list(userId: string, page: number, query?: string): Promise<ListResponse>;
  listByUserIdAndAppointmentDay(userId: string, day: daysOfWeekType): Promise<Patient[]>;
}
