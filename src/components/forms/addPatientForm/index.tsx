/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPatientFormSchema, type AddPatientFormValues } from "./schema";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { PersonalInformation } from "./personal-information";
import { MedicalInformation } from "./medical-information";
import { AppointmentInformation } from "./appointment-information";
import { CircleDashed } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface AddPatientFormProps {
	onSubmit: (data: AddPatientFormValues) => void;
	loading?: boolean;
}

export function AddPatientForm({ onSubmit, loading }: AddPatientFormProps) {
	const form = useForm<AddPatientFormValues>({
		resolver: zodResolver(AddPatientFormSchema),
		defaultValues: {
			name: '',
			address: '',
			allergies: '',
			appointmentFrom: '',
			appointmentTo: '',
			chronicDiseases: '',
			observations: '',
			email: '',
			gender: '',
			medicalHistory: '',
			medications: '',
			modality: 'inPerson',
			nationality: '',
			occupation: '',
			phones: [{ number: '', refersTo: '' }],
			appointmentDay: "monday",
			age: 0,
			birthDate: new Date(),
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 px-6 md:px-0"
			>
				<PersonalInformation form={form} />
				<MedicalInformation form={form} />
				<AppointmentInformation form={form} />

				<div className='w-full text-center pt-4'>
					<p>Additional Information</p>
				</div>
				<FormField
					control={form.control}
					name="observations"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Observations</FormLabel>
							<FormControl>
								<Textarea
									placeholder="observations"
									className="resize-none"
									{...field}
								/>

							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full pt-10">
					<Button
						type="submit"
						className='w-full'
					>
						{loading ? (
							<CircleDashed className="animate-spin h-5 w-5" />
						) : "Add"}
					</Button>
				</div>
			</form>
		</Form>

	)
}
