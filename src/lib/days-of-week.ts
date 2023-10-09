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

export const daysUppercase =  {
	monday: 'Monday',
	tuesday: 'Tuesday',
	wednesday: 'Wednesday',
	thursday: 'Thursday',
	friday: 'Friday',
	saturday: 'Saturday',
	sunday: 'Sunday',
}

export type daysOfWeekType = z.infer<typeof daysOfWeek>;
