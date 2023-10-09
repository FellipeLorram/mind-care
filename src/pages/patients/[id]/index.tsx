import { useRouter } from 'next/router';

import { type daysOfWeekType } from '@/lib/days-of-week';
import { Topbar } from '@/components/layout/topbar'
import { api } from '@/lib/api';
import { usePatientContext } from '@/context/patient-context';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import ScheduleTime from '@/components/layout/patient-page/schedule-time';
import { Notes } from '@/components/layout/patient-page/notes';

export default function Page() {
	const { id } = useRouter().query;
	const {
		updateMedicalInfo,
		updateAppointmentInfo,
		updatePersonalInfo,
	} = usePatientContext();

	const { data } = api.patients.getProfile.useQuery({
		patient_id: id as string ?? '1',
	}, {
		onSuccess: (data) => {
			const { patient } = data;
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
					birth_date: patient.birth_date?.toISOString().split('T')[0] ?? '',
					address: patient.address ?? '',
					observations: patient.observation ?? '',
					nationality: patient.nationality ?? '',
					occupation: patient.occupation ?? '',
				});

				updateMedicalInfo({
					allergies: patient.allergies ?? '',
					chronicDiseases: patient.chronic_diseases ?? '',
					medications: patient.medications ?? '',
					medicalHistory: patient.medical_history ?? '',
				});

				updateAppointmentInfo({
					appointment_day: patient.appointment_day as daysOfWeekType,
					appointment_from: patient.appointment_from ?? '',
					appointment_to: patient.appointment_to ?? '',
					modality: patient.modality as "inPerson" | "online" | "hibrid",
				});
			}
		}
	});

	const patient = data?.patient;

	return (
		<>
			<Topbar.Wrapper className='pb-4'>
				<div className='flex items-center justify-between'>
					<Topbar.Logo />
					<Topbar.Actions />
				</div>
			</Topbar.Wrapper>
			<div className='w-11/12 max-w-6xl mx-auto'>
				<div className='w-full flex md:items-center gap-4 items-start justify-between flex-col md:flex-row my-10'>
					<h1 className='text-2xl font-medium'>
						{patient?.name}
					</h1>
					<div>
						<Button variant='secondary' className='mr-4'>
							Download
						</Button>
						<Link href={`/appointments/new/${patient?.id}`} className={buttonVariants()}>
							Start appointment
						</Link>
					</div>
				</div>

				<ScheduleTime />
				<h1 className='text-xl font-medium mt-14 mb-4'>
					Notes
				</h1>

				<Notes />
			</div>

		</>
	)
}
