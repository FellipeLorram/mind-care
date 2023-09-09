export function Todaysappointments() {
	return (
		<div className='flex flex-col mx-auto w-11/12 max-w-xl border-2 border-gray-300 p-4 rounded-xl gap-4 h-72'>
			<div className='w-full text-left'>
				<h1 className="font-medium text-gray-700">
					{"Today's Appointments"}
				</h1>

			</div>
			{/* <div className='w-full flex flex-col '>
				{data?.patients?.map((patient) => (
					<div
						key={patient.id}
						className='w-full flex flex-row gap-1 items-center justify-between border-b border-t first:border-t-0 last:border-b-0 border-gray-300 md:p-2 cursor-pointer hover:bg-gray-50 duration-200 hover:shadow hover:px-3'
					>
						<p className='text-sm md:text-base'>{patient.name}</p>
						<p className='text-sm md:text-base'>{patient.appointment_day} - {patient.appointment_from} - {patient.appointment_to}</p>
					</div>
				))}
			</div> */}
		</div>
	)
}
