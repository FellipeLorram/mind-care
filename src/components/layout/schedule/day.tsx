import Link from 'next/link';
import { CircleDashed, Play, UserSquare2 } from 'lucide-react';
import { api } from '@/lib/api'
import { type daysOfWeekType } from '@/lib/days-of-week'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
	day: daysOfWeekType;
}

const days = {
	monday: 'Monday',
	tuesday: 'Tuesday',
	wednesday: 'Wednesday',
	thursday: 'Thursday',
	friday: 'Friday',
	saturday: 'Saturday',
	sunday: 'Sunday',
}

export function DayAgenda({ day }: Props) {
	const { data, isLoading } = api.agenda.getDaysAgenda.useQuery({
		day,
	}, {
		staleTime: 1000 * 60 * 5,
	});

	const agenda = data?.agenda ?? []

	return (
		<div className='w-full h-full flex flex-col rounded border border-input'>
			<div className="w-full text-center p-2 border-b border-input">
				<h1 className="font-medium">{days[day]} Appointments</h1>
			</div>
			<div className="w-full flex flex-col items-center justify-center gap-4">
				{agenda.length > 0 ? agenda.map(({ patient, appointment }) => (
					<div className='w-full flex items-center justify-between text-base border-b px-4 py-2' key={patient.id}>
						<p>
							{appointment.from} to {appointment.to}
						</p>

						<p>
							{patient?.name}
						</p>

						<div className='flex flex-row items-center justify-center gap-4'>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<Link
											href={`/appointments/new/${patient.id}`}
										>
											<Play
												className='w-4'
											/>
										</Link>
									</TooltipTrigger>
									<TooltipContent>
										<p>Start Appointment</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<Link
											href={`/patients/${patient.id}/personal-information`}
										>
											<UserSquare2
												className='w-4'
											/>
										</Link>
									</TooltipTrigger>
									<TooltipContent>
										<p>See Patient</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>
				)) : (
					<div className="text-muted-foreground text-center p-4">
						{isLoading ? <CircleDashed className='animate-spin h-6 w-6' /> : 'No appointments yet for this day'}
					</div>
				)}
			</div>
		</div>
	)
}
