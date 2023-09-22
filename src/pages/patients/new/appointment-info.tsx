import { AppointmentInformationForm } from "@/components/forms/patient-form/appointment-information";
import { type PatientAppointmentInfoSchemaType } from "@/components/forms/patient-form/schema";
import { AddPatientLayout } from "@/components/layout/add-patient/layout";
import { PatientPersonalInfo } from "@/components/layout/add-patient/patient-personal-info";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { usePatientContext } from "@/context/patient-context";
import { api } from "@/lib/api";
import { ChevronLeftIcon, CircleDashed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
	const {
		isLoading,
		mutate,
		data
	} = api.patients.create.useMutation();
	const { personalInfo, clearPatientContext } = usePatientContext();
	const { push } = useRouter();
	const { toast } = useToast();

	useEffect(() => {
		if (!personalInfo.name) {
			void push('/patients/new/personal-info')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function onSubmit({
		appointmentDay,
		appointmentFrom,
		appointmentTo,
		modality
	}: PatientAppointmentInfoSchemaType) {
		try {
			mutate({
				...personalInfo,
				birthDate: new Date(personalInfo.birthDate),
				appointment_from: appointmentFrom,
				appointment_to: appointmentTo,
				appointment_day: appointmentDay,
				modality: modality,
			});

			toast({
				title: 'Success',
				description: 'Patient created successfully',
			});

			console.log(data)

			await push('/')
			clearPatientContext()
		} catch (error) {
			console.error(error)
			toast({
				title: 'Error',
				description: 'Something went wrong',
			})
		}
	}

	return (
		<AddPatientLayout>
			<div
				className="w-11/12 max-w-2xl mx-auto bg-background border border-input shadow-3xl pb-8 rounded-lg h-full my-2"
			>
				<Link
					href={'/patients/new/personal-info'}
					className="w-full p-2 mb-8 flex items-center justify-start flex-row rounded-t-lg border">
					<ChevronLeftIcon
						className="cursor-pointer w-6"
					/>
					<p className="">
						Personal information
					</p>
				</Link>


				<div className='max-w-xl w-10/12 mx-auto'>

					<h1 className="mb-6">
						Appointment day and time
					</h1>
					<AppointmentInformationForm
						loading={isLoading}
						onSubmit={onSubmit}
						submitButton={
							<Button
								type="submit"
								className="w-full justify-center"
								disabled={isLoading}
							>
								{isLoading ? (
									<CircleDashed
										className="animate-spin"
										size={24}
									/>
								) : (
									'Add patient'
								)}
							</Button>
						}
					/>
				</div>
			</div>
		</AddPatientLayout>
	)
}
