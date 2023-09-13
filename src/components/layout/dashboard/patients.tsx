import { buttonVariants } from '@/components/ui/button';
import { api } from '@/lib/api'
import { Search } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

export function Patients() {
	// const { data, isLoading } = api.patients.list.useQuery({
	// 	page: 1,
	// });

	// const patients = data?.patients ?? [];

	return (
		<div className='w-full mx-auto max-w-xl rounded-md'>
			<div>
				<Link
					className={buttonVariants()}
					href='/patients/new'
				>
					Add Patient
				</Link>
			</div>
		</div>
	)
}
