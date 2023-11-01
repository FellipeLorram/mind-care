import { useRouter } from "next/router";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { api } from "@/lib/api";
import { useAppointmentContext } from "@/context/appointment-context";
import { Topbar } from "@/components/layout/topbar";
import { PatientName } from "@/components/layout/patient-page/patient-name";
import { PauseAndPlayButtons, Timer, TimerActions, TimerWrapper } from "@/components/layout/appointment-page/appointment-timer";
import { AppointmentNoteActions } from "@/components/layout/appointment-page/appointment-note-editor-actions";
import { DiscardAppointmentDialog } from "@/components/layout/appointment-page/discard-appointment-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AppointmentMetricsForm, type AppointmentMetricsFormValues } from "@/components/forms/appointment-metrics-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CircleDashed } from "lucide-react";

export default function Page() {
	const { push, query } = useRouter();
	const { toast } = useToast();
	const { seconds, stopTimer, discardAppointment } = useAppointmentContext();
	const { mutate, isLoading } = api.appointments.create.useMutation({
		onSuccess: async ({ appointment }) => {
			toast({
				title: 'Appointment created successfully',
				description: 'You can now view the appointment',
			});
			discardAppointment();
			await push(`/patients/${query.id as string}/appointments/${appointment.id}`);
		},
	})
	const { data } = api.patients.getProfile.useQuery({ patient_id: query.id as string }, {
		enabled: !!query.id
	});

	const editor = useEditor({
		extensions: [StarterKit.configure({
			heading:
				{ HTMLAttributes: { class: 'text-xl' } }
		})],
		content: `
		<p>Objective of the Session:</p>
		<br/>
		<p>Patient's Current State:</p>
		<br/>
		<p>Review of Previous Goals:</p>
		<br/>
		<p>Homework/Assignments:</p>
		<br/>
		<p>Key Topics to Explore:</p>
		<br/>
		<p>Mood and Emotional State:</p>
		<br/>
		<p>Any Notable Events:</p>
		<br/>
		<p>Treatment Plan Adjustments:</p>
		<br/>
		<p>Patient's Questions or Concerns:</p>
		`,
		editorProps: {
			attributes: {
				class: 'outline-none p-12'
			}
		}
	});

	function onSubmit(data: AppointmentMetricsFormValues) {
		const content = editor?.getHTML() ?? '';
		mutate({
			note: content,
			duration: seconds,
			modality: 'online',
			...data,
			patient_id: query.id as string,
		});
	}

	return (
		<>
			<Topbar.Wrapper className='pb-4'>
				<div className='flex items-center justify-between'>
					<Topbar.Logo />
					<Topbar.Actions />
				</div>
			</Topbar.Wrapper>

			<div className='w-11/12 max-w-6xl mx-auto pb-14'>
				<div className='w-full flex md:items-center gap-4 items-start justify-between flex-col md:flex-row my-10'>
					<PatientName>
						{data?.patient?.name}
					</PatientName>
					<TimerWrapper>
						<Timer />
						<TimerActions>
							<PauseAndPlayButtons />
							<Dialog onOpenChange={stopTimer}>
								<DialogTrigger asChild>
									<Button size="sm" disabled={seconds === 0}>
										Finish
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>
											Appointment Metrics
										</DialogTitle>
										<DialogDescription>
											You can always edit later.
										</DialogDescription>
									</DialogHeader>
									<AppointmentMetricsForm onSubmit={onSubmit}>
										<div className="w-full flex items-center justify-end pt-6">
											<Button
												disabled={isLoading}
												type="submit"
											>

												{isLoading ? (
													<CircleDashed className="animate-spin mx-auto" />
												) : "Save and Finish"}
											</Button>
										</div>
									</AppointmentMetricsForm>
								</DialogContent>
							</Dialog>
						</TimerActions>
					</TimerWrapper>
				</div>
				<div className='mx-auto max-w-6xl w-full flex flex-col items-center justify-between flex-1'>
					<AppointmentNoteActions editor={editor} />
					<div className='w-full border flex-1 overflow-auto'>
						<EditorContent
							className='w-full h-96'
							editor={editor}
						/>
					</div>

					<div className="w-full flex items-center justify-end mt-14 p-4 rounded-lg dark:bg-red-500/5 bg-red-500/20">
						<DiscardAppointmentDialog />
					</div>
				</div>
			</div>
		</>
	)
}
