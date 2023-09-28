import { type UseFormReturn } from 'react-hook-form';
import { type AddPatientFormValues } from '../schema';
import { type daysOfWeekType } from '@/lib/days-of-week';

import { generateTimeSlots } from '@/lib/time-slots';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DayAgenda } from './day-agenda';

interface Props {
	form: UseFormReturn<AddPatientFormValues>;
}

const days: daysOfWeekType[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const times = generateTimeSlots('06:00');

export function AppointmentInformation({
	form,
}: Props) {
	const appointmentFrom = form.watch('appointmentFrom');
	const toSelectFields = generateTimeSlots(appointmentFrom);

	return (
		<div className='space-y-6 p-6 md:p-8 border rounded-lg shadow-4xl'>
			<div className='w-full text-center '>
				<p>Appointment day</p>
			</div>
			<FormField
				control={form.control}
				name="modality"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Modality</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="modality" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="inPerson">
									In Person
								</SelectItem>
								<SelectItem value="online">
									Online
								</SelectItem>
								<SelectItem value="hibrid">
									Hibrid
								</SelectItem>
							</SelectContent>
						</Select>

						<FormMessage />
					</FormItem>
				)}
			/>

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
			<div className="w-full flex flex-col md:flex-row items-center gap-6">
				<FormField
					control={form.control}
					name="appointmentFrom"
					render={({ field }) => (
						<FormItem className="flex flex-col w-full">
							<FormLabel>From</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue className="text-muted-foreground" placeholder="00:00" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='h-96'>
									{times.map((time) => (
										<SelectItem
											key={time}
											value={time}
										>
											{time}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="appointmentTo"
					render={({ field }) => (
						<FormItem className="flex flex-col w-full">
							<FormLabel>To</FormLabel>
							<Select disabled={!appointmentFrom} onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue className="text-muted-foreground" placeholder="00:00" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='h-96'>
									{toSelectFields.map((time) => (
										<SelectItem
											key={time}
											value={time}
										>
											{time}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<DayAgenda day={form.watch('appointmentDay')} />
		</div>
	)
}
