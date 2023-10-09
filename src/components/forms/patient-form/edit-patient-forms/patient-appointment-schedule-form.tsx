/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { type PatientAppointmentInfoSchemaType, PatientAppointmentInfoSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { CircleDashed } from 'lucide-react'
import { DayAgenda } from '../add-patient-form/day-agenda'
import { generateTimeSlots } from '@/lib/time-slots'
import { type daysOfWeekType } from '@/lib/days-of-week'

interface Props {
	onSubmit: (data: PatientAppointmentInfoSchemaType) => void
	loading?: boolean;
	defaultValues?: PatientAppointmentInfoSchemaType
}

const days: daysOfWeekType[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const times = generateTimeSlots('06:00');

export function PatientAppointmentScheculeForm({
	onSubmit,
	defaultValues,
	loading
}: Props) {
	const form = useForm<PatientAppointmentInfoSchemaType>({
		resolver: zodResolver(PatientAppointmentInfoSchema),
		defaultValues: defaultValues ?? {
			appointment_day: 'monday',
			appointment_from: '06:00',
			appointment_to: '06:30',
			modality: 'inPerson',
		}
	});

	const appointmentFrom = form.watch('appointment_from');
	const toSelectFields = generateTimeSlots(appointmentFrom);

	return (
		<Form  {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 w-full"
			>
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
					name="appointment_day"
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
						name="appointment_from"
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
						name="appointment_to"
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

				<DayAgenda day={form.watch('appointment_day')} />

				<Button
					type="submit"
					className='w-full'
				>
					{loading ? (
						<CircleDashed className="animate-spin h-5 w-5" />
					) : "Save"}
				</Button>

			</form>
		</Form>
	)
}
