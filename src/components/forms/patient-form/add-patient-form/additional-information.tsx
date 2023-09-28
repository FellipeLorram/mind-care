import { type AddPatientFormValues } from "../schema";
import { type UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface Props {
	form: UseFormReturn<AddPatientFormValues>;
}

export function AdditionalInformation({
	form,
}: Props) {
	return (
		<div className='space-y-6 p-6 md:p-8 border rounded-lg shadow-4xl'>

			<div className='w-full text-center'>
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
		</div>
	)
}
