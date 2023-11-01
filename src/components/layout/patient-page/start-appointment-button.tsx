import { useRouter } from 'next/router';
import { useAppointmentContext } from '@/context/appointment-context';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

export function StartAppointment() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const { push, query } = useRouter();
	const {
		patientId,
		seconds,
		// eslint-disable-next-line @typescript-eslint/unbound-method
		startAppointment,
		resetTimer,
	} = useAppointmentContext();

	const currentPatientAppointmentRunning = patientId === query.id && seconds > 0;

	async function onClick() {
		if (patientId !== query.id && patientId !== '') {
			setDialogOpen(true);
			return;
		}

		startAppointment(query.id as string);
		await push(`/patients/${query.id as string}/appointments/new`);
	}

	async function confirmStart() {
		setDialogOpen(false);
		resetTimer();
		startAppointment(query.id as string);
		await push(`/patients/${query.id as string}/appointments/new`);
	}

	return (
		<>
			<Button
				onClick={onClick}
			>
				{currentPatientAppointmentRunning ? 'Continue Appointment' : 'Start Appointment'}
			</Button>
			<Dialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This will stop the current appointment and start a new one.
						</DialogDescription>
						<div className='flex flex-row gap-4 justify-end'>
							<Button
								variant="outline"
								onClick={confirmStart}
							>
								Start anyway
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	)
}
