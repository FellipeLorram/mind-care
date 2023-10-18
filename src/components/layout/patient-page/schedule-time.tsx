import { usePatientContext } from '@/context/patient-context';
import React from 'react'
import { ScheduleTimeDialog } from './schedule-time-dialog';
import { daysUppercase } from '@/lib/days-of-week';
// import { Button } from '@/components/ui/button';

export default function ScheduleTime() {
	const { appointmentInfo } = usePatientContext();

	const {
		appointment_day,
		appointment_from,
		appointment_to,
		modality,
	} = appointmentInfo;

	return (
		<div className='w-full flex flex-row items-center justify-between border-b border rounded-lg p-6'>
			{appointment_day ? (
				<div className='flex flex-col'>
					<p className='text-lg font-semibold'>{daysUppercase[appointment_day]} - {modality}</p>
					<p className='text-sm'>{appointment_from} - {appointment_to}</p>
				</div>
			) : <p>No patient schedule time</p>}

			<ScheduleTimeDialog />
		</div>
	)
}
