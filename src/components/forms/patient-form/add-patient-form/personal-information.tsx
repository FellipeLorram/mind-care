import { useEffect } from "react";
import { differenceInDays } from "date-fns";
import { type UseFormReturn } from "react-hook-form";

import { type AddPatientFormValues } from "../schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhoneFields } from "./phone-fields";

interface Props {
	form: UseFormReturn<AddPatientFormValues>;
}

export function PersonalInformation({
	form,
}: Props) {
	return (
		<div className='space-y-6 p-6 md:p-8 border rounded-lg shadow-4xl'>
			<div className='w-full text-center '>
				<p>Personal Information</p>
			</div>
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

			<PhoneFields form={form} />
		</div>
	)
}

type BirthDateAndAgeFieldsProps = {
	form: UseFormReturn<AddPatientFormValues>;
}

function BirthDateAndAgeFields({ form }: BirthDateAndAgeFieldsProps) {
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
							<Input
								type="date"
								placeholder="age"
								{...field}
								value={
									field.value
										? new Date(field.value).toISOString().split('T')[0]
										: ''
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
