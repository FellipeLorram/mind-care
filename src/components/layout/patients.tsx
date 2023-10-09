import { useState } from 'react';
import Link from 'next/link';
import { CircleDashed, Search } from 'lucide-react'

import { api } from '@/lib/api'
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';

export function Patients() {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className='w-11/12 mx-auto max-w-4xl '>
			<div className='flex flex-col-reverse md:flex-row w-full items-center justify-between gap-2'>

				<div className='relative w-full'>
					<Input
						className='w-full md:w-96 h-8 focus focus-visible:ring-1 focus-visible:ring-offset-0 pl-8'
						placeholder='Search'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Search className='absolute top-2 left-2 w-4 h-4 text-muted-foreground' />
				</div>

				<Link
					className={buttonVariants({ variant: 'default', className: 'w-full md:w-40' })}
					href='/patients/new'
				>
					<p>
						Add Patient
					</p>
				</Link>
			</div>
			<PatientList
				searchTerm={searchTerm}
			/>
		</div>
	)
}

interface PatientListProps {
	searchTerm?: string;
}

function PatientList({ searchTerm }: PatientListProps) {
	const { data, isLoading } = api.patients.list.useQuery({
		page: 1,
		query: searchTerm,
	});

	const patients = data?.patients ?? [];
	const count = data?.count ?? 0;

	return (
		<div className='w-full overflow-hidden relative rounded-md border border-input mt-4 h-96 flex flex-col '>
			{isLoading ? (
				<div className='flex-1 flex items-center justify-center'>
					<CircleDashed className='w-8 h-8 mx-auto mt-4 stroke-muted-foreground animate-spin' />
				</div>
			) : (
				<>
					{count === 0 ? (
						<div className='flex-1 flex items-center justify-center'>
							<p className='text-muted-foreground'>No patients found</p>
						</div>
					) : (
						<div className='flex-1 overflow-y-auto w-full'>
							{patients.map((patient) => (
								<Link
									href={`/patients/${patient.id}`}
									key={patient.id}
									className='flex items-center justify-center px-4 py-2 border-b border-input gap-2 first:rounded-t-md  only:rounded-b-none'
								>
									<div className='flex-1'>
										<p className='text-muted-foreground'>{patient.name}</p>
									</div>
									{patient.appointment_day ? (
										<>
											<p className='text-muted-foreground'>{patient.appointment_day}</p>
											<p className='text-muted-foreground hidden sm:block'>{patient.appointment_from} - {patient.appointment_to}</p>
										</>
									) : <p className='text-muted-foreground'>
										No schedule time
									</p>}
								</Link>
							))}
						</div>
					)}
				</>
			)}
			{count > 10 && (
				<Link
					href='/patients'
					className='w-full text-center p-4'
				>
					<p>
						See all
					</p>
				</Link>
			)}
		</div>
	)
}