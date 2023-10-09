import { daysOfWeek } from "@/lib/days-of-week";
import { z } from "zod";

export const PatientPersonalInfoSchema = z.object({
	name: z.string().nonempty({ message: 'Name is required' }),
	age: z.string().or(z.number()).transform(v => Number(v)),
	email: z.string().email().optional().default('no-provided@email.com'),
	gender: z.string().optional(),
	address: z.string().optional(),
	nationality: z.string().optional(),
	occupation: z.string().optional(),
	birth_date: z.string(),
	observations: z.string().optional(),
	phones: z.array(z.object({
		number: z.string().nonempty({ message: 'Phone number is required' }),
		refersTo: z.string().nonempty({ message: 'Phone refers to is required' }),
	})).optional(),
});

export type PatientPersonalInfoSchemaType = z.infer<typeof PatientPersonalInfoSchema>;

export const PatientMedicalInfoSchema = z.object({
	medicalHistory: z.string().optional(),
	medications: z.string().optional(),
	allergies: z.string().optional(),
	chronicDiseases: z.string().optional(),
});

export type PatientMedicalInfoSchemaType = z.infer<typeof PatientMedicalInfoSchema>;

export const PatientAppointmentInfoSchema = z.object({
	modality: z.enum(['inPerson', 'online', 'hibrid']),
	appointment_day: daysOfWeek,
	appointment_from: z.string().nonempty({ message: 'Appointment from is required' }),
	appointment_to: z.string().nonempty({ message: 'Appointment to is required' }),
});

export type PatientAppointmentInfoSchemaType = z.infer<typeof PatientAppointmentInfoSchema>;

