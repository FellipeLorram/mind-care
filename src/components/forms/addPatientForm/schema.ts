import { daysOfWeek } from "@/lib/days-of-week";
import { z } from "zod";

export const AddPatientFormSchema = z.object({
	name: z.string().nonempty(),
	age: z.string().transform(v => Number(v)),
	email: z.string().email().optional(),
	gender: z.string().optional(),
	phone: z.array(z.string().nonempty()),
	address: z.string().optional(),
	nationality: z.string().optional(),
	occupation: z.string().optional(),
	birthDate: z.date().optional(),
	appointmentDay: daysOfWeek,
	appointmentFrom: z.string(),
	appointmentTo: z.string(),
	observations: z.string().optional(),
	medicalHistory: z.string().optional(),
	medications: z.string().optional(),
	allergies: z.string().optional(),
	chronicDiseases: z.string().optional(),
	modality: z.string(),
}).refine(({ appointmentFrom, appointmentTo }) => {
	const from = Number(appointmentFrom.split(':')[0]);
	const to = Number(appointmentTo.split(':')[0]);
	return from < to;
}, {
	message: 'Appointment from must be before appointment to',
}).refine(({ appointmentFrom, appointmentTo }) => {
	const from = Number(appointmentFrom.split(':')[0]);
	const to = Number(appointmentTo.split(':')[0]);
	return to - from === 1;
}, {
	message: 'Appointment must be one hour long',
}).refine(({ appointmentFrom, appointmentTo }) => {
	const from = Number(appointmentFrom.split(':')[0]);
	const to = Number(appointmentTo.split(':')[0]);
	return from >= 8 && to <= 20;
}, {
	message: 'Appointment must be between 8:00 and 20:00',
});

export type AddPatientFormValues = z.infer<typeof AddPatientFormSchema>;
