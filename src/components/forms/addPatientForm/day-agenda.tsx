import React from 'react'

interface Props {
	day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
}

export function DayAgenda({ day }: Props) {
	return (
		<div className='w-full flex flex-col rounded border border-gray-300'>
			<div className="w-full text-center p-2">
				<h1 className="font-medium">{day} Appointments</h1>
			</div>
		</div>
	)
}
