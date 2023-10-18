import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { NoteEditor } from "./note-editor"
import { api } from "@/lib/api"
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export function AddDetachedNoteDialog() {
	const { query } = useRouter();
	const { toast } = useToast();
	const { mutate } = api.detachedNotes.create.useMutation({
		onSuccess: () => {
			toast({
				title: 'Note created',
				description: 'Your note has been created',
				duration: 5000,
			});
		},
	});

	function onSave(content: string) {
		mutate({
			content,
			patientId: query.id as string,
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					Add Note
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="mb-8">Add Note</DialogTitle>
					<NoteEditor
						onSave={onSave}
					/>
				</DialogHeader>
			</DialogContent>
		</Dialog>

	)
}
