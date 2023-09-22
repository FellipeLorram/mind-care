import React, { useCallback } from 'react'
import { type UseFormReturn } from 'react-hook-form';
import { type PatientPersonalInfoSchemaType } from './schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface PersonalInformationProps {
	form: UseFormReturn<PatientPersonalInfoSchemaType>;
}

export function PhoneFields({ form }: PersonalInformationProps) {
	const phones = form.watch('phones');
	const phonesSliced = phones.slice(1);

	const addPhoneField = useCallback(() => {
		form.setValue(`phones.${phones.length}`, { number: '', refersTo: '' });
	}, [form, phones]);

	const removePhoneField = useCallback((index: number) => {
		form.setValue('phones', phones.filter((_, i) => i !== index));
	}, [form, phones]);

	return (
		<div className="w-full flex flex-col gap-4 pt-6">
			<FormLabel>Phones</FormLabel>

			<div
				className='w-full flex flex-row gap-4 md:gap-6 items-end justify-center'
			>
				<FormField
					control={form.control}
					name={`phones.${0}.number`}
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Number</FormLabel>
							<FormControl>
								<Input placeholder="phone number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`phones.${0}.refersTo`}
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Refers to</FormLabel>
							<FormControl>
								<Input placeholder="refers to" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Plus
					className='cursor-pointer stroke-gray-500 hover:stroke-gray-700 duration-200 ease-in-out w-10 h-10'
					onClick={() => addPhoneField()}
				/>
			</div>
			{phonesSliced.map((_, index) => (
				<div
					key={index}
					className='w-full flex flex-row gap-4 md:gap-6 items-end justify-center'
				>
					<FormField
						control={form.control}
						name={`phones.${index + 1}.number`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormControl>
									<Input placeholder="phone number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`phones.${index + 1}.refersTo`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormControl>
									<Input placeholder="refers to" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Minus
						className='cursor-pointer stroke-gray-500 hover:stroke-gray-700 duration-200 ease-in-out w-10 h-10'
						onClick={() => removePhoneField(index + 1)}
					/>
				</div>
			))}
		</div>
	)
}
