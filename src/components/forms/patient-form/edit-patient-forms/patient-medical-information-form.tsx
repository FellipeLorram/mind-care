/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type PatientMedicalInfoSchemaType, PatientMedicalInfoSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { CircleDashed } from 'lucide-react'
import { useEffect } from 'react'


interface Props {
	onSubmit: (data: PatientMedicalInfoSchemaType) => void
	loading?: boolean;
	defaultValues?: PatientMedicalInfoSchemaType
}

export function EditPatientMedicalInformationForm({
	onSubmit,
	defaultValues,
	loading
}: Props) {
	const form = useForm<PatientMedicalInfoSchemaType>({
		resolver: zodResolver(PatientMedicalInfoSchema),
		defaultValues: {
			allergies: '',
			chronicDiseases: '',
			medicalHistory: '',
			medications: '',
		}
	});

	useEffect(() => {
		form.reset(defaultValues ?? ({} as PatientMedicalInfoSchemaType))
	}, [defaultValues]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 pb-8"
			>
				<div className='space-y-6 p-6 md:p-8 border rounded-lg shadow-4xl'>

					<FormField
						control={form.control}
						name="allergies"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Allergies</FormLabel>
								<FormControl>
									<Input placeholder="allergies" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="chronicDiseases"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Chronic Diseases</FormLabel>
								<FormControl>
									<Input placeholder="chronic diseases" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="medicalHistory"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Medical History</FormLabel>
								<FormControl>
									<Input placeholder="medical history" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="medications"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Medications</FormLabel>
								<FormControl>
									<Input placeholder="medications" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					type="submit"
					className='w-full md:w-1/2 mx-auto'
				>
					{loading ? (
						<CircleDashed className="animate-spin h-5 w-5" />
					) : "Save"}
				</Button>
			</form>
		</Form>
	)
}

