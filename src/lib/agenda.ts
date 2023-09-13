import { z } from "zod";


export const AgendaSchema = z.object({
	patient: z.object({
		id: z.string(),
		name: z.string(),
	}),
	appointment: z.object({
		from: z.string(),
		to: z.string(),
		day: z.string(),
	}),
});

export type agenda = z.infer<typeof AgendaSchema>;
