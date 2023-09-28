import { EditPersonalInformationForm } from '@/components/forms/patient-form/edit-patient-forms/personal-information-form'
import { usePatientContext } from '@/context/patient-context'
import React from 'react'

export function PersonalInformationPage() {
	const { personalInfo } = usePatientContext()

	const onSubmit = () => {
		console.log()
	}
	
	return (
		<div className='w-full max-w-3xl'>
			<EditPersonalInformationForm
				onSubmit={onSubmit}
				defaultValues={personalInfo}
			/>
		</div>
	)
}
