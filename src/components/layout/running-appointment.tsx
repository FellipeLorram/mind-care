import { useAppointmentContext } from '@/context/appointment-context'
import { api } from '@/lib/api';
import { useRouter } from 'next/router';
import { PauseAndPlayButtons, Timer, TimerActions, TimerWrapper } from './appointment-page/appointment-timer';
import Link from 'next/link';

export function RunningAppointment() {
	const { pathname } = useRouter();
	const { seconds, patientId } = useAppointmentContext();

	const isAppointmentPage = pathname === '/patients/[id]/appointments/new';

	
	const { data } = api.patients.getProfile.useQuery({
		patient_id: patientId,
	}, {
		enabled: !!patientId,
	});
	
	const date = new Date(0);
	date.setSeconds(seconds);
	
	if (!(seconds > 0) || isAppointmentPage) return null;

	return (
		<div className='fixed bottom-0 left-0 w-full border-t bottom-to-top-enter-active bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='w-11/12 max-w-6xl py-4 mx-auto flex items-center justify-between'>
				<Link
					href={`/patients/${patientId}/appointments/new`}
					className='underline underline-offset-4'
				>
					{data?.patient?.name} is currently in an appointment.
				</Link>
				<TimerWrapper className='w-auto'>
					<Timer />
					<TimerActions>
						<PauseAndPlayButtons />
					</TimerActions>
				</TimerWrapper>
			</div>
		</div>
	)
}
