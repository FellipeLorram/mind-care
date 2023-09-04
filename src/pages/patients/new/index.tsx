import { AddPatientForm } from '@/components/forms/addPatientForm'
import { type AddPatientFormValues } from '@/components/forms/addPatientForm/schema';
import { api } from '@/lib/api'
import { motion } from 'framer-motion'

export default function Page() {
	const { isLoading, mutate } = api.patients.create.useMutation();

	function onSubmit(values: AddPatientFormValues) {
		console.log(values)
		// mutate({
		// 	name: values.name,
		// 	appointment_duration: values.appointmentDuration,
		// 	age: values.age,
		// 	address: values.address,
		// 	appointment_time: values.appointmentTime,
		// 	birthDate: values.birthDate,
		// 	email: values.email,
		// 	modality: values.modality,
		// 	observation: values.observations,
		// 	gender: values.gender,
		// 	nationality: values.nationality,
		// })
	}

	return (
		<div>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-2xl mx-auto bg-white shadow-3xl p-4 md:px-8 rounded-lg h-full mt-2"
			>
				<AddPatientForm 
					onSubmit={onSubmit}
					loading={isLoading}
				/>
			</motion.div>
		</div>
	)
}
