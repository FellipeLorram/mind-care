/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPatientFormSchema, type AddPatientFormValues } from "./schema";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { PersonalInformation } from "./personal-information";
import { MedicalInformation } from "./medical-information";
import { AppointmentInformation } from "./appointment-information";
import { CircleDashed } from "lucide-react";

interface AddPatientFormProps {
	onSubmit: (data: AddPatientFormValues) => void;
	loading?: boolean;
}

export function AddPatientForm({ onSubmit, loading }: AddPatientFormProps) {
	const form = useForm<AddPatientFormValues>({
		resolver: zodResolver(AddPatientFormSchema),
		defaultValues: {
			name: "",
			age: 0,
			email: "",
			gender: "",
			phone: [] as string[],
			address: "",
			nationality: "",
			birthDate: new Date(),
			appointmentFrom: "",
			appointmentTo: "",
			observations: "",
			medicalHistory: "",
			medications: "",
			allergies: "",
			chronicDiseases: "",
			modality: "",
			occupation: "",
			appointmentDay: "monday",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<PersonalInformation form={form} />
				<MedicalInformation form={form} />
				<AppointmentInformation form={form} />

				{/* <FormField
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
				/> */}

				<Button
					type="submit"
					className='w-full'
				>
					{loading ? (
						<CircleDashed className="animate-spin h-5 w-5" />
					) : "Add"}
				</Button>
			</form>
		</Form>

	)
}
