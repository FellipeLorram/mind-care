import { Pointer } from "lucide-react";
import { useRouter } from "next/router";
import parse from 'html-react-parser';
import Link from "next/link";
import { format } from 'date-fns';
import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { NoteEditor } from "../notes-dialog/note-editor";
import { toast } from "@/components/ui/use-toast";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Notes() {
	const { query, replace } = useRouter();
	const { data, refetch } = api.detachedNotes.list.useQuery({
		patientId: query.id as string ?? '',
		page: 1,
	});

	const { mutate } = api.detachedNotes.update.useMutation({
		onSuccess: () => {
			toast({
				title: 'Note updated',
				description: 'Your note has been updated',
				duration: 5000,
			});
		},

	});

	async function onSave(content: string) {
		mutate({
			content,
			patientId: query.id as string,
			noteId: query.noteid as string,
		});
		await refetch();
	}

	return (
		<div className="w-full h-60 border rounded-lg flex flex-col items-center justify-center">
			{data && data.length > 0 ? (
				<div className='w-full flex-1 flex flex-col items-start justify-start overflow-auto'>
					{data?.map(note => (
						<Dialog
							key={note.id}
							aria-label="Note"
							onOpenChange={() => replace(`${query.id as string}?noteid=${note.id}`)}
						>
							<DialogTrigger asChild>
								<Button variant="outline" className='first:rounded-t-lg last:rounded-b-lg p-6 rounded-none border-r-0 w-full flex justify-between items-center flex-row'>
									<p>{format(note.createdAt, 'dd/MM/yyyy hh:mm')}</p>
									<TooltipProvider>
										<Tooltip delayDuration={0.2}>
											<TooltipTrigger asChild className="flex flex-row gap-2">
												<div>
													<Pointer className="w-4 h-4" strokeWidth={1} />
													<p>
														Preview note
													</p>
												</div>
											</TooltipTrigger>
											<TooltipContent className="max-w-sm">
												{parse(note.content)}
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
									<p>
										Detached note
									</p>
								</Button>
							</DialogTrigger>
							<DialogContent className="pb-0">
								<DialogHeader>
									<DialogTitle className="mb-8">Note - {format(note.createdAt, 'dd/MM/yyyy')}</DialogTitle>
									<NoteEditor
										content={note.content}
										onSave={onSave}
									/>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					))}
				</div>
			) :
				<Link
					className={buttonVariants({
						variant: 'secondary',
						className: 'mt-4',

					})}
					href={`/patients/${query.id as string}/notes`}
				>
					Add Note
				</Link>
			}
		</div>
	)
}
