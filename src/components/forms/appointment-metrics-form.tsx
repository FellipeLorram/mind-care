import { type ReactNode } from "react";
import { Label } from "../ui/label"
import { Slider } from "@/components/ui/slider"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface Props {
	children: ReactNode;
	onSubmit: (values: AppointmentMetricsFormValues) => void;
}

const AppointmentMetricsFormSchema = z.object({
	communication_effectiveness: z.number().min(1).max(5).default(3),
	engagement_level: z.number().min(1).max(5).default(3),
	progress: z.number().min(1).max(5).default(3),
	session_outcome: z.number().min(1).max(5).default(3),
	treatment_adherence: z.number().min(1).max(5).default(3),
});

export type AppointmentMetricsFormValues = z.infer<typeof AppointmentMetricsFormSchema>;

export function AppointmentMetricsForm({ children, onSubmit }: Props) {
	const form = useForm<AppointmentMetricsFormValues>({
		resolver: zodResolver(AppointmentMetricsFormSchema),
		defaultValues: AppointmentMetricsFormSchema.parse({}),
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>

				<FormField
					control={form.control}
					name="communication_effectiveness"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel className="text-lg">Communication effectiveness: {value}</FormLabel>
							<FormControl>
								<Slider
									max={5} min={1} step={1}
									defaultValue={[value]}
									onValueChange={(vals) => {
										onChange(vals[0]);
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="engagement_level"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel className="text-lg">Engagement level: {value}</FormLabel>
							<FormControl>
								<Slider
									max={5} min={1} step={1}
									defaultValue={[value]}
									onValueChange={(vals) => {
										onChange(vals[0]);
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="progress"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel className="text-lg">Progress: {value}</FormLabel>
							<FormControl>
								<Slider
									max={5} min={1} step={1}
									defaultValue={[value]}
									onValueChange={(vals) => {
										onChange(vals[0]);
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="session_outcome"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel className="text-lg">Session outcome: {value}</FormLabel>
							<FormControl>
								<Slider
									max={5} min={1} step={1}
									defaultValue={[value]}
									onValueChange={(vals) => {
										onChange(vals[0]);
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="treatment_adherence"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel className="text-lg">Treatment adherence: {value}</FormLabel>
							<FormControl>
								<Slider
									max={5} min={1} step={1}
									defaultValue={[value]}
									onValueChange={(vals) => {
										onChange(vals[0]);
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				{children}
			</form>
		</Form>
	)
}
