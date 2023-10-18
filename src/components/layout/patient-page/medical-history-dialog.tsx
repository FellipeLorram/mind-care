import { useRouter } from "next/router";
import { type PatientMedicalInfoSchemaType } from "@/components/forms/patient-form/schema";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast";
import { usePatientContext } from "@/context/patient-context";
import { api } from "@/lib/api";
import { PatientMedicalInformationForm } from "@/components/forms/patient-form/edit-patient-forms/patient-medical-information-form";

export function MedicalHistoryDialog() {
	const { id } = useRouter().query;
	const { medicalInfo, updateMedicalInfo } = usePatientContext();
	const { toast } = useToast();
	const { mutate, isLoading } = api.patients.update.useMutation({
		onSuccess: ({ patient }) => {
			toast({
				title: 'Success',
				description: 'Medical history updated successfully',
			});

			updateMedicalInfo({
				allergies: patient.allergies ?? '',
				chronicDiseases: patient.chronic_diseases ?? '',
				medications: patient.medications ?? '',
				medicalHistory: patient.medical_history ?? '',
			});
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Something went wrong',
			});
		}
	});

	function onSubmit(data: PatientMedicalInfoSchemaType) {
		mutate({
			patient_id: id as string,
			...data
		})
	}

	const {
		allergies,
		chronicDiseases,
		medicalHistory,
		medications,
	} = medicalInfo;

	const hasMedicalHistory =
		allergies ??
		chronicDiseases ??
		medicalHistory ??
		medications;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" className='border'>
					{hasMedicalHistory ? 'Edit' : 'Add'}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Medical History</DialogTitle>

					<PatientMedicalInformationForm
						onSubmit={onSubmit}
						loading={isLoading}
						defaultValues={medicalInfo}
					/>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

