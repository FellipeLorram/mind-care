/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export const AddPatientFormSchema = z.object({
	name: z.string().nonempty(),
	age: z.number().positive().int(),
	email: z.string().email().optional(),
	gender: z.string().optional(),
	phone: z.array(z.string().nonempty()).optional(),
	address: z.string().optional(),
	nationality: z.string().optional(),
	occupation: z.string().optional(),
	birthDate: z.date().optional(),
	appointmentTime: z.string().optional(),
	appointmentDuration: z.number().int().positive().optional(),
	observations: z.string().optional(),
	medicalHistory: z.string().optional(),
	medications: z.string().optional(),
	allergies: z.string().optional(),
	chronicDiseases: z.string().optional(),
});

export function AddPatientForm() {
	const [phone, setPhone] = useState('');

	const form = useForm({
		resolver: zodResolver(AddPatientFormSchema),
		defaultValues: {
			name: "",
			age: 0,
			email: "",
			gender: "",
			phone: [] as string[],
			address: "",
			nationality: "",
			ocuppation: "",
			birthDate: new Date(),
			appointmentTime: "",
			appointmentDuration: 0,
			observations: "",
			medicalHistory: "",
			medications: "",
			allergies: "",
			chronicDiseases: "",
		},
	});

	const phones = form.watch('phone');

	return (
		<Form {...form}>
			<form className="space-y-6">
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

				<div className="w-full flex flex-wrap items-end justify-between gap-6">
					<FormField
						control={form.control}
						name="birthDate"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full md:max-w-[18rem]">
								<FormLabel>Date of birth</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="age"
						render={({ field }) => (
							<FormItem className="w-full md:max-w-[18rem]">
								<FormLabel>Age</FormLabel>
								<FormControl>
									<Input placeholder="age" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

				</div>

				<FormField
					control={form.control}
					name="gender"
					render={({ field }) => (
						<FormItem>
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

				<div className="w-full flex flex-col items-center justify-center gap-2">
					<div className="flex w-full items-end justify-center gap-4">
						<Label className="space-y-2 w-full">
							<p>
								Phone
							</p>
							<Input
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="phone"
							/>
						</Label>


						<Button
							type="button"
							onClick={() => {
								form.setValue("phone", [...form.getValues("phone"), phone])
								setPhone('')
							}}
						>
							Add
						</Button>
					</div>

					<div
						className="w-full flex flex-row items-center justify-start gap-2"
					>
						{phones.map((phone) => (
							<div
								key={phone}
								className="p-1 px-2 flex flex-row items-center justify-between gap-2 bg-gray-200 rounded-sm"
							>
								<p className="text-sm">
									{phone}
								</p>
								<X
									className="cursor-pointer w-4 stroke-gray-500 hover:stroke-gray-700 duration-200"
									onClick={() => {
										form.setValue("phone", phones.filter((p) => p !== phone))
									}}
								/>
							</div>
						))}
					</div>

				</div>


				<FormField
					control={form.control}
					name="nationality"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Medications</FormLabel>
							<FormControl>
								<Input placeholder="medications" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="ocuppation"
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
					name="allergies"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Allergies</FormLabel>
							<FormControl>
								<Input placeholder="allergies" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="chronicDiseases"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Chronic Diseases</FormLabel>
							<FormControl>
								<Input placeholder="chronic diseases" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="medicalHistory"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Medical History</FormLabel>
							<FormControl>
								<Input placeholder="medical history" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="medications"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Medications</FormLabel>
							<FormControl>
								<Input placeholder="medications" {...field} />
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

				<Button type="submit">Submit</Button>
			</form>
		</Form>

	)
}
