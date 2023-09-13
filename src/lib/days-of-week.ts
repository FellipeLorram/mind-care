import { z } from "zod";

export const daysOfWeek = z.union([
	z.literal('monday'),
	z.literal('tuesday'),
	z.literal('wednesday'),
	z.literal('thursday'),
	z.literal('friday'),
	z.literal('saturday'),
	z.literal('sunday'),
]);

export type daysOfWeekType = z.infer<typeof daysOfWeek>;
