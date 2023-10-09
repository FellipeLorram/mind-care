/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { CircleDashed } from "lucide-react";
import { type PatientPersonalInfoSchemaType, PatientPersonalInfoSchema } from "../schema";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { differenceInDays } from "date-fns";
import { useEffect } from "react";

interface AddPatientFormProps {
	onSubmit: (data: PatientPersonalInfoSchemaType) => void;
	loading?: boolean;
}

export function AddPatientForm({ onSubmit, loading }: AddPatientFormProps) {
	const form = useForm<PatientPersonalInfoSchemaType>({
		resolver: zodResolver(PatientPersonalInfoSchema),
		defaultValues: {
			address: '',
			age: 0,
			birth_date: '',
			email: '',
			gender: '',
			name: '',
			nationality: '',
			occupation: '',
			observations: '',
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 pb-8"
			>
				<div className='space-y-6 p-6 md:p-8 border rounded-lg shadow-4xl'>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<BirthDateAndAgeFields form={form} />

					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input placeholder="address" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="w-full flex flex-col md:flex-row items-end justify-between gap-6">
						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Gender</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue className="text-muted-foreground" placeholder="gender" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="male">Male</SelectItem>
											<SelectItem value="female">Female</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="nationality"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Nationality</FormLabel>
									<FormControl>
										<Input placeholder="nationality" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="occupation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ocuppation</FormLabel>
								<FormControl>
									<Input placeholder="ocuppation" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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


				<Button
					type="submit"
					className='w-full md:w-1/2 mx-auto'
				>
					{loading ? (
						<CircleDashed className="animate-spin h-5 w-5" />
					) : "Add"}
				</Button>

			</form>
		</Form>
	)
}

type BirthDateAndAgeFieldsProps = {
	form: UseFormReturn<PatientPersonalInfoSchemaType>;
}

function BirthDateAndAgeFields({ form }: BirthDateAndAgeFieldsProps) {
	const birthDate = form.watch('birth_date');
	const daysDifference = differenceInDays(new Date(), new Date(birthDate));
	const yearsDifference = Math.floor(daysDifference / 365.25);

	useEffect(() => {
		if (yearsDifference > 0) {
			form.setValue('age', yearsDifference);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [yearsDifference]);

	return (
		<div className="w-full flex flex-col md:flex-row items-end justify-between gap-6">
			<FormField
				control={form.control}
				name="birth_date"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Birth date</FormLabel>
						<FormControl>
							<Input
								type="date"
								placeholder="age"
								{...field}
								value={
									typeof field.value === 'string'
										? field.value
										: new Date().toISOString().slice(0, 10)
								}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>


			<FormField
				control={form.control}
				name="age"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Age</FormLabel>
						<FormControl>
							<Input type="number" placeholder="age" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
