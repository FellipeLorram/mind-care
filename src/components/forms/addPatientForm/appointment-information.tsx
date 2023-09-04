import { type daysOfWeek, type AddPatientFormValues } from './schema';
import { type UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type z } from 'zod';
import { Input } from '@/components/ui/input';
import { DayAgenda } from './day-agenda';

interface AppointmentInformationProps {
	form: UseFormReturn<AddPatientFormValues>;
}

const days: z.infer<typeof daysOfWeek>[] = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
]

export function AppointmentInformation({ form }: AppointmentInformationProps) {
	return (
		<div className='space-y-6'>
			<div className='w-full text-center pt-4'>
				<p>Appointment Information</p>
			</div>
			<FormField
				control={form.control}
				name="appointmentDay"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Day of Week</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue className="text-muted-foreground" placeholder="day of week" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{days.map((day) => (
									<SelectItem
										key={day}
										value={day}
									>
										{day}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="w-full flex flex-wrap items-end justify-between gap-6">

				<FormField
					control={form.control}
					name="appointmentFrom"
					render={({ field }) => (
						<FormItem className="flex flex-col w-full md:max-w-[18rem]">
							<FormLabel>From</FormLabel>
							<FormControl>
								<Input placeholder="00:00" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="appointmentTo"
					render={({ field }) => (
						<FormItem className="flex flex-col w-full md:max-w-[18rem]">
							<FormLabel>To</FormLabel>
							<FormControl>
								<Input placeholder="00:00" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<DayAgenda day={form.watch('appointmentDay')} />
		</div>
	)
}
