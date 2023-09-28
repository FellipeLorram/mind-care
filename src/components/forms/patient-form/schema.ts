import { daysOfWeek } from "@/lib/days-of-week";
import { z } from "zod";

export const PersonalInfoSchema = z.object({
	name: z.string().nonempty({ message: 'Name is required' }),
	age: z.string().or(z.number()).transform(v => Number(v)),
	email: z.string().email().optional().default('no-provided@email.com'),
	gender: z.string().optional(),
	address: z.string().optional(),
	nationality: z.string().optional(),
	occupation: z.string().optional(),
	birthDate: z.string(),
	observations: z.string().optional(),
	phones: z.array(z.object({
		number: z.string().nonempty({ message: 'Phone number is required' }),
		refersTo: z.string().nonempty({ message: 'Phone refers to is required' }),
	})),
});

export type PatientPersonalInfoSchemaType = z.infer<typeof PersonalInfoSchema>;

export const PatientMedicalInfoSchema = z.object({
	medicalHistory: z.string().optional(),
	medications: z.string().optional(),
	allergies: z.string().optional(),
	chronicDiseases: z.string().optional(),
});

export type PatientMedicalInfoSchemaType = z.infer<typeof PatientMedicalInfoSchema>;

export const PatientAppointmentInfoSchema = z.object({
	modality: z.enum(['inPerson', 'online', 'hibrid']),
	appointmentDay: daysOfWeek,
	appointmentFrom: z.string().nonempty({ message: 'Appointment from is required' }),
	appointmentTo: z.string().nonempty({ message: 'Appointment to is required' }),
});

export type PatientAppointmentInfoSchemaType = z.infer<typeof PatientAppointmentInfoSchema>;

export const AddPatientFormSchema = z.object({
	...PersonalInfoSchema.shape,
	...PatientMedicalInfoSchema.shape,
	...PatientAppointmentInfoSchema.shape,
}).refine(({ appointmentFrom, appointmentTo }) => {
	const from = new Date(`2000-01-01T${appointmentFrom}`);
	const to = new Date(`2000-01-01T${appointmentTo}`);
	return from < to;
}, {
	message: 'Appointment to must be after appointment from',
	path: ['appointmentTo'],
}).transform(data => ({
	...data,
	birthDate: new Date(data.birthDate),
}));

export type AddPatientFormValues = z.infer<typeof AddPatientFormSchema>;