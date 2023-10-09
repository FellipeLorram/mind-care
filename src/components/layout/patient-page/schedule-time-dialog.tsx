import { PatientAppointmentScheculeForm } from "@/components/forms/patient-form/edit-patient-forms/patient-appointment-schedule-form";
import { type PatientAppointmentInfoSchemaType } from "@/components/forms/patient-form/schema";
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
import { type daysOfWeekType } from "@/lib/days-of-week";
import { useRouter } from "next/router";

export function ScheduleTimeDialog() {
	const { id } = useRouter().query;
	const { appointmentInfo, updateAppointmentInfo } = usePatientContext();
	const { toast } = useToast();
	const { mutate, isLoading } = api.patients.update.useMutation({
		onSuccess: ({ patient }) => {
			toast({
				title: 'Success',
				description: 'Schedule time updated successfully',
			});

			updateAppointmentInfo({
				appointment_day: patient.appointment_day as daysOfWeekType,
				appointment_from: patient.appointment_from ?? '',
				appointment_to: patient.appointment_to ?? '',
				modality: patient.modality as "inPerson" | "online" | "hibrid",
			});
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Something went wrong',
			});
		}
	});

	function onSubmit(data: PatientAppointmentInfoSchemaType) {
		mutate({
			patient_id: id as string,
			...data
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" className='border'>
					{appointmentInfo.appointment_day ? 'Edit' : 'Add'}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Schedule time</DialogTitle>

					<PatientAppointmentScheculeForm
						onSubmit={onSubmit}
						loading={isLoading}
						defaultValues={appointmentInfo}
					/>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

