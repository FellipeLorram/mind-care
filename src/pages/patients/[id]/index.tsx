import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import { type ComponentNames, ComponentTree } from '@/components/layout/single-patient-page/component-tree';
import { Topbar } from '@/components/layout/topbar'
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { usePatientContext } from '@/context/patient-context';

type NavigationLabel = {
	label: string
	value: ComponentNames
}

const navigationLabels: NavigationLabel[] = [
	{ label: 'Personal Information', value: 'personal-information' },
	{ label: 'Medical Information', value: 'medical-information' },
	{ label: 'Appointment Information', value: 'appointment-information' },
	{ label: 'Notes', value: 'notes' },
];

export default function Page() {
	const [selectedLabel, setSelectedLabel] = useState<ComponentNames>('personal-information');
	const { id } = useRouter().query;
	const { data } = api.patients.getProfile.useQuery({
		patientId: id as string,
	})

	const {
		updatePersonalInfo,
	} = usePatientContext();

	const patient = data?.patient;

	useEffect(() => {
		if (patient) {
			updatePersonalInfo({
				name: patient.name,
				age: patient.age,
				email: patient.email ?? '',
				gender: patient.gender ?? '',
				phones: patient.phones.map(phone => {
					return {
						number: phone.number,
						refersTo: phone.refers_to,
					}
				}),
				birthDate: patient.birthDate?.toString() ?? '',
			});

			// updateMedicalInfo(data);
			// updateAppointmentInfo(data);
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [patient]);

	return (
		<>
			<Topbar.Wrapper className='pb-4'>
				<div className='flex items-center justify-between'>
					<Topbar.Logo />
					<Topbar.Actions />
				</div>
			</Topbar.Wrapper>
			<div className='w-11/12 py-12 p-8 mx-auto flex flex-col items-center md:flex-row md:items-start justify-start gap-4'>
				<div className='hidden md:flex flex-col items-start justify-center gap-2 w-1/5'>
					{navigationLabels.map(({ label, value }) => (
						<Button
							onClick={() => setSelectedLabel(value)}
							variant='ghost'
							className={`${value === selectedLabel ? 'font-semibold' : 'text-muted-foreground'} hover:bg-transparent`}
							key={label}
						>
							{label}
						</Button>
					))}
				</div>

				<ComponentTree component={selectedLabel} />
			</div>
		</>
	)
}
