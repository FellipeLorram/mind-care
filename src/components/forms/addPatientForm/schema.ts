import { daysOfWeek } from "@/lib/days-of-week";
import { z } from "zod";

export const AddPatientFormSchema = z.object({
	name: z.string().nonempty({ message: 'Name is required' }),
	age: z.string().transform(v => Number(v)),
	email: z.string().email().optional().default('no-provided@email.com'),
	gender: z.string().optional(),
	phones: z.array(z.object({
		number: z.string().nonempty({ message: 'Phone number is required' }),
		refersTo: z.string().nonempty({ message: 'Phone refers to is required' }),
	})),
	address: z.string().optional(),
	nationality: z.string().optional(),
	occupation: z.string().optional(),
	birthDate: z.string(),
	appointmentDay: daysOfWeek,
	appointmentFrom: z.string().nonempty({ message: 'Appointment from is required' }),
	appointmentTo: z.string().nonempty({ message: 'Appointment to is required' }),
	observations: z.string().optional(),
	medicalHistory: z.string().optional(),
	medications: z.string().optional(),
	allergies: z.string().optional(),
	chronicDiseases: z.string().optional(),
	modality: z.enum(['inPerson', 'online', 'hibrid'])
}).refine(({ appointmentFrom, appointmentTo }) => {
    const from = new Date(`2000-01-01T${appointmentFrom}`);
    const to = new Date(`2000-01-01T${appointmentTo}`);
    return from < to;
}, {
    message: 'Appointment to must be after appointment from',
    path: ['appointmentTo'],
}).refine(({ appointmentFrom, appointmentTo }) => {
    const from = new Date(`2000-01-01T${appointmentFrom}`);
    const to = new Date(`2000-01-01T${appointmentTo}`);
    const minTime = new Date(`2000-01-01T08:00`);
    const maxTime = new Date(`2000-01-01T20:00`);
    return from >= minTime && to <= maxTime;
}, {
    message: 'Appointment must be between 8:00 and 20:00',
    path: ['appointmentTo'],
}).transform(data => ({
	...data,
	birthDate: new Date(data.birthDate),
}));




export type AddPatientFormValues = z.infer<typeof AddPatientFormSchema>;
