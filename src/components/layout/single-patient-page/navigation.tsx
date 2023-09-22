import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

const navigationLabels = [
	{ label: 'Personal Information', value: 'personal-information' },
	{ label: 'Medical Information', value: 'medical-information' },
	{ label: 'Appointment Information', value: 'appointment-information' },
	{ label: 'Phones', value: 'phones' },
	{ label: 'Notes', value: 'notes' },
];

export function Navigation() {
	const router = useRouter();
	const selectedLabel = router.asPath.split('/').pop();
	const patientId = router.query.id as string;

	return (
			<div className='hidden md:flex flex-col items-start justify-center gap-2 w-1/5'>
				{navigationLabels.map(({ label, value }) => (
					<Link
						href={`/patients/${patientId}/${value}`}
						className={buttonVariants({
							variant: 'ghost',
							className: `${value === selectedLabel ? 'font-semibold' : 'text-muted-foreground'} hover:bg-transparent`
						})}
						key={label}
					>
						{label}
					</Link>
				))}
			</div>
	)
}
