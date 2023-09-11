import { api } from "@/lib/api";
import { CircleDashed } from "lucide-react";

type daysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const days: Record<string, daysOfWeek> = {
	Monday: 'monday',
	Tuesday: 'tuesday',
	Wednesday: 'wednesday',
	Thursday: 'thursday',
	Friday: 'friday',
	Saturday: 'saturday',
	Sunday: 'sunday',
};

export function Todaysappointments() {
	const dayWithUppercase = new Date().toLocaleDateString('en-US', { weekday: 'long' });
	const day = days[dayWithUppercase];

	const { data, isLoading } = api.agenda.getDaysAgenda.useQuery({
		day: day!,
	}, {
		staleTime: 1000 * 60 * 5,
	});

	const agenda = data?.agenda ?? [];

	return (
		<div className='flex flex-col mx-auto w-11/12 max-w-xl border border-gray-300 shadow-4xl p-4 rounded-xl gap-4 h-72'>
			<div className='w-full text-left'>
				<h1 className="font-medium text-gray-700">
					{"Today's Appointments"}
				</h1>

			</div>
			{isLoading ? (
				<div className="flex flex-col gap-4">
					<div className="flex w-full items-start justify-between flex-1">
						<div className="w-1/3 bg-gray-200 rounded-md animate-pulse h-4" />
						<div className="w-1/3 bg-gray-200 rounded-md animate-pulse h-4" />
					</div>
					<div className="flex w-full items-start justify-between flex-1">
						<div className="w-1/3 bg-gray-200 rounded-md animate-pulse h-4" />
						<div className="w-1/3 bg-gray-200 rounded-md animate-pulse h-4" />
					</div>
				</div>
			) : (
				<div className='w-full flex flex-col items-center justify-center flex-1'>
					{agenda.length === 0 ? (
						<p className="text-gray-500 text-center self-center">
							{'It seems like you have a free day! :)'}
						</p>
					) : (
						<>
							{agenda.map(({ patient, appointment }) => (
								<div
									key={patient.id}
									className='w-full flex flex-row gap-1 items-center justify-between border-b border-t first:border-t-0 last:border-b-0 border-gray-300 md:p-2 cursor-pointer hover:bg-gray-50 duration-200 hover:shadow hover:px-3'
								>
									<p className='text-sm md:text-base'>{patient.name}</p>
									<p className='text-sm md:text-base'>{appointment.from} - {appointment.to}</p>
								</div>
							))}
						</>
					)}
				</div>
			)}
		</div>
	)
}
