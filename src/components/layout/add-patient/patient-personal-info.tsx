import { buttonVariants } from '@/components/ui/button';
import { usePatientContext } from '@/context/patient-context'
import Link from 'next/link';
import React from 'react'

export function PatientPersonalInfo() {
	const { personalInfo } = usePatientContext();

	return (
		<div
			className="w-11/12 max-w-2xl relative overflow-hidden mx-auto bg-background border border-input shadow-3xl rounded-lg h-full my-2 group"
		>
			<div className='w-full flex flex-col items-start justify-center gap-4 '>
				<div className='w-full flex items-start justify-center gap-4 border-b'>
					<p className='text-sm'>Name:</p>
					<p className='text-sm'>{personalInfo.name}</p>
				</div>
				<div className='w-full flex items-start justify-center gap-4 border-b'>
					<p className='text-sm'>Age:</p>
					<p className='text-sm'>{personalInfo.age}</p>
				</div>
				<div className='w-full flex items-start justify-center gap-4'>
					<p className='text-sm'>E-mail:</p>
					<p className='text-sm'>{personalInfo.email}</p>
				</div>
			</div>

		</div>
	)
}
