import { useEffect } from "react";
import { differenceInDays } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import { CircleDashed } from "lucide-react";

import { type PatientPersonalInfoSchemaType, PersonalInfoSchema } from "./schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PhoneFields } from "./phone-fields";

interface PersonalInformationFormProps {
	onSubmit: (data: PatientPersonalInfoSchemaType) => void;
	loading?: boolean;
	disabled?: boolean;
	defaultValues?: PatientPersonalInfoSchemaType;
}

export function PersonalInformation({
	onSubmit,
	loading,
	disabled,
	defaultValues,
}: PersonalInformationFormProps) {
	const form = useForm<PatientPersonalInfoSchemaType>({
		resolver: zodResolver(PersonalInfoSchema),
		defaultValues: defaultValues ?? {
			name: '',
			address: '',
			age: 0,
			birthDate: '',
			email: '',
			gender: '',
			nationality: '',
			occupation: '',
			observations: '',
			phones: [{ number: '', refersTo: '' }],
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input disabled={disabled} placeholder="name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<BirthDateAndAgeFields disabled={disabled} form={form} />

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input disabled={disabled} placeholder="address" {...field} />
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
								<Select disabled={disabled} onValueChange={field.onChange} defaultValue={field.value}>
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
									<Input disabled={disabled} placeholder="nationality" {...field} />
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
								<Input disabled={disabled} placeholder="email" {...field} />
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
								<Input disabled={disabled} placeholder="ocuppation" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<PhoneFields form={form} />

				<div className="w-full pt-4">
					<Button
					className="w-full"
						type="submit"
					>
						{loading ? (
							<CircleDashed className="animate-spin h-5 w-5" />
						) : "Next"}
					</Button>
				</div>
			</form>
		</Form>
	)
}

type BirthDateAndAgeFieldsProps = {
	form: UseFormReturn<PatientPersonalInfoSchemaType>;
	disabled?: boolean;
}

function BirthDateAndAgeFields({ form, disabled }: BirthDateAndAgeFieldsProps) {
	const birthDate = form.watch('birthDate');
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
				name="birthDate"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Birth date</FormLabel>
						<FormControl>
							<Input disabled={disabled}
								type="date"
								placeholder="age"
								{...field}
								value={field.value}
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
							<Input disabled={disabled} type="number" placeholder="age" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
