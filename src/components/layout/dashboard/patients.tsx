import { buttonVariants } from '@/components/ui/button';
import { api } from '@/lib/api'
import { Search } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

export function Patients() {
	const { data, isLoading } = api.patients.list.useQuery({
		page: 1,
	});

	const patients = data?.patients ?? [];

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
			<div className='w-full flex flex-1 flex-col overflow-x-hidden'>
				{isLoading ? (
					<div className="flex flex-col gap-4">
						<div className="flex w-full items-start justify-between flex-1">
							<div className="w-1/3 bg-gray-200 rounded-md animate-pulse h-4" />
							<div className="w-1/3 bg-gray-200 rounded-md animate-pulse h-4" />
						</div>
						<div className="flex w-full items-start justify-between flex-1">
							<div className="w-1/3 bg-gray-200 rounded-md animate-pulse h-4" />
							<div className="w-1/3 bg-gray-200 rounded-md animate-pulse h-4" />
						</div>
					</div>
				) : (
					<>
						{patients.map((patient) => (
							<Link
								href={`/patients/${patient.id}`}
								key={patient.id}
								className='w-full flex flex-row gap-1 items-center justify-between border-b border-t first:border-t-0 last:border-b-0 border-gray-300 md:p-2 cursor-pointer hover:bg-gray-50 duration-200 hover:shadow hover:px-3'
							>
								<p className='text-sm md:text-base'>{patient.name}</p>
								<p className='text-sm md:text-base'>{patient.appointment_day} - {patient.appointment_from} - {patient.appointment_to}</p>
							</Link>
						))}
						{patients.length > 9 && (
							<Link
								href={`/patients`}
								className='mx-auto my-2 p-2 rounded-md bg-gray-200 hover:bg-gray-300 duration-200 cursor-pointer'
							>
								<p className='text-sm md:text-base'>View all</p>
							</Link>

						)}
						{patients.length === 0 && (
							<div className='flex flex-col items-center justify-center flex-1 gap-4'>
								<p className='text-sm md:text-base'>No patients found</p>
								<Link
									className={buttonVariants({
										variant: 'secondary',
										className: 'border border-gray-300'
									})}
									href="patients/new"
								>
									Add
								</Link>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
