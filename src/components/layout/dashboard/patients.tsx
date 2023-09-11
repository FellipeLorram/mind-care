import { api } from '@/lib/api'
import { Search } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

export function Patients() {
	const { data } = api.patients.list.useQuery({
		page: 1,
	});

	return (
		<div className='relative flex flex-col mx-auto w-11/12 max-w-xl border border-gray-300 p-4 rounded-xl gap-4 h-72 shadow-4xl'>
			<div className='w-full flex flex-row justify-between items-center'>
				<Link
					href="/patients"
					className="font-medium text-gray-700 border-b hover:border-gray-700 duration-200 cursor-pointer"
				>
					Patients
				</Link>

				<Search className='w-5 h-5 stroke-gray-500 hover:stroke-gray-700 duration-200 cursor-pointer' />
			</div>
			<div className='w-full flex flex-col overflow-x-hidden'>
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
				{data?.patients && data?.patients.length > 9 && (
					<Link
						href={`/patients`}
						className='mx-auto my-2 p-2 rounded-md bg-gray-200 hover:bg-gray-300 duration-200 cursor-pointer'
					>
						<p className='text-sm md:text-base'>View all</p>
					</Link>

				)}
			</div>

		</div>
	)
}
