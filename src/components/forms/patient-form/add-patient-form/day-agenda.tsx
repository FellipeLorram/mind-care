import { api } from '@/lib/api'
import { type daysOfWeekType } from '@/lib/days-of-week'
import { CircleDashed } from 'lucide-react';
import React from 'react'

interface Props {
	day: daysOfWeekType;
}

const days = {
	monday: 'Monday',
	tuesday: 'Tuesday',
	wednesday: 'Wednesday',
	thursday: 'Thursday',
	friday: 'Friday',
	saturday: 'Saturday',
	sunday: 'Sunday',
}

export function DayAgenda({ day }: Props) {
	const { data, isLoading } = api.agenda.getDaysAgenda.useQuery({
		day,
	}, {
		staleTime: 1000 * 60 * 5,
	});

	const agenda = data?.agenda ?? []

	return (
		<div className='w-full flex flex-col rounded border border-input min-h-[150px]'>
			<div className="w-full text-center p-2 border-b border-input">
				<h1 className="font-medium">{days[day]} Appointments</h1>
			</div>
			<div className="w-full flex flex-col items-center justify-center p-4">
				{agenda.length > 0 ? agenda.map(({ patient, appointment }) => (
					<div className='w-full text-left text-sm' key={patient.id}>
						{appointment.from} - {appointment.to}: {patient?.name}
					</div>
				)) : (
					<div className="text-muted-foreground text-center p-2">
						{isLoading ? <CircleDashed className='animate-spin h-6 w-6' /> : 'No appointments yet for this day'}
					</div>
				)}
			</div>
		</div>
	)
}
