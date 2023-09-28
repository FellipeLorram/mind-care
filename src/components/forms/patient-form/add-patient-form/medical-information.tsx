import { type AddPatientFormValues } from '../schema';
import { type UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props {
	form: UseFormReturn<AddPatientFormValues>;
}

export function MedicalInformation({ form }: Props) {
	return (
		<div className='space-y-6 p-6 md:p-8 border rounded-lg shadow-4xl'>
			<div className='w-full text-center '>
				<p>Medical Information</p>
			</div>
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
	)
}
