import React from 'react'
import { type PatientPersonalInfoSchemaType } from '@/components/forms/patient-form/schema';
import { AddPatientForm } from '@/components/forms/patient-form/add-patient-form/'
import { Topbar } from '@/components/layout/topbar'
import { api } from '@/lib/api'
import { useRouter } from 'next/router';
import { useToast } from '@/components/ui/use-toast';

export default function Page() {
	const { push } = useRouter();
	const { toast } = useToast();
	const {
		mutate,
		isLoading,
	} = api.patients.create.useMutation({
		onSuccess: async ({ patient }) => {
			toast({
				title: 'Success',
				description: 'Patient created successfully',
			});
			await push(`/patients/${patient.id}`);
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Something went wrong',
			});
		}
	});

	function onSubmit(data: PatientPersonalInfoSchemaType) {
		const { phones, ...values } = data;
		mutate({ ...values, birth_date: new Date(values.birth_date) });
	}

	return (
		<>
			<Topbar.Wrapper className='flex-row justify-between pb-6 mb-8'>
				<Topbar.Logo />
				<Topbar.Actions />
			</Topbar.Wrapper>
			<div className='w-11/12 mx-auto max-w-3xl'>
				<h1 className='mb-8 text-xl font-medium'>
					New Patient
				</h1>
				<AddPatientForm
					onSubmit={onSubmit}
					loading={isLoading}
					
				/>
			</div>
		</>
	)
}
