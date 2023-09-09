import { Calendar } from 'lucide-react'
import React from 'react'

export function WeekAppointments() {
	return (
		<div className='flex flex-col mx-auto w-full border-2 border-gray-300 p-4 rounded-xl gap-4 h-72'>
			<div className='w-full flex flex-row justify-between items-center'>
				<h1 className="font-medium text-gray-700">
					Week Appointments
				</h1>

				<Calendar className='w-5 h-5 stroke-gray-500 hover:stroke-gray-700 duration-200 cursor-pointer' />
			</div>
			{/* <div className='w-full flex flex-col '>
				{data?.patients?.map((patient) => (
					<Link
						href={`/patients/${patient.id}`}
						key={patient.id}
						className='w-full flex flex-row gap-1 items-center justify-between border-b border-t first:border-t-0 last:border-b-0 border-gray-300 md:p-2 cursor-pointer hover:bg-gray-50 duration-200 hover:shadow hover:px-3'
					>
						<p className='text-sm md:text-base'>{patient.name}</p>
						<p className='text-sm md:text-base'>{patient.appointment_day} - {patient.appointment_from} - {patient.appointment_to}</p>
					</Link>
				))}
			</div> */}
		</div>
	)
}
