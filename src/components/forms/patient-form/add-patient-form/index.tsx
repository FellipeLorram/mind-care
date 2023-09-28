/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPatientFormSchema, type AddPatientFormValues } from "../schema";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { CircleDashed } from "lucide-react";
import { MedicalInformation } from "./medical-information";
import { AppointmentInformation } from "./appointment-information";
import { PersonalInformation } from "./personal-information";
import { AdditionalInformation } from "./additional-information";

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
				className="space-y-6 pb-8"
			>
				<PersonalInformation form={form} />
				<MedicalInformation form={form} />
				<AppointmentInformation form={form} />
				<AdditionalInformation form={form} />

				<div className="w-full ">
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
