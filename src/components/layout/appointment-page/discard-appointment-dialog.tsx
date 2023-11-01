import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,

} from '@/components/ui/dialog';
import { useAppointmentContext } from '@/context/appointment-context';
import { useRouter } from 'next/router';


export function DiscardAppointmentDialog() {
	const { push, query } = useRouter();
	const { discardAppointment } = useAppointmentContext();

	const handleDiscard = async () => {
		discardAppointment();
		await push(`/patients/${query.id as string}`);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="destructive"
				>
					Discard
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						All the changes you made will be lost.
					</DialogDescription>
					<div className='flex flex-row gap-4 justify-end'>
						<Button
							onClick={handleDiscard}
							variant="outline"
						>
							Discard
						</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
