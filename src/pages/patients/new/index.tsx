import { AddPatientForm } from '@/components/forms/addPatientForm'
import React from 'react'

export default function Page() {
	return (
		<div>
			<div className="w-full max-w-2xl mx-auto bg-white shadow-3xl p-4 md:px-8 rounded-lg h-full mt-2">
				<AddPatientForm />
			</div>
		</div>
	)
}
