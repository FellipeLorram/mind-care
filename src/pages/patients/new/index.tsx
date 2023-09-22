import { AddPatientForm } from '@/components/forms/patient-form'
import { type AddPatientFormValues } from '@/components/forms/patient-form/schema';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';

export default function Page() {
	const {
		isLoading,
		mutate,
		data,
	} = api.patients.create.useMutation();
	const { toast } = useToast();
	const { push } = useRouter();

	async function onSubmit(values: AddPatientFormValues) {
		try {
			mutate({
				...values,
				appointment_from: values.appointmentFrom,
				appointment_to: values.appointmentTo,
				appointment_day: values.appointmentDay,
			});

			toast({
				title: 'Success',
				description: 'Patient created successfully',
			});

			await push(`/patients/${data?.patient?.id}`);
		} catch (error) {
			console.error(error)
			toast({
				title: 'Error',
				description: 'Something went wrong',
			})
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full max-w-3xl mx-auto bg-background border border-input shadow-3xl py-12 rounded-lg h-full my-2"
		>
			<div className='max-w-xl mx-auto'>
				<AddPatientForm
					onSubmit={onSubmit}
					loading={isLoading}
				/>
			</div>
		</motion.div>
	)
}
