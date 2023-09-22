// import { motion } from 'framer-motion';

import { useState } from "react";
import { PersonalInformation } from "@/components/forms/patient-form/personal-information";
import { type PatientPersonalInfoSchemaType } from "@/components/forms/patient-form/schema";
import { AddPatientLayout } from "@/components/layout/add-patient/layout";
import { usePatientContext } from "@/context/patient-context";
import { useRouter } from "next/router";

export default function Page() {
	const [loading, setLoading] = useState(false);
	const { push } = useRouter();
	const { personalInfo, updatePersonalInfo, } = usePatientContext();

	async function onPersonalInformationSubmit(data: PatientPersonalInfoSchemaType) {
		setLoading(true);
		updatePersonalInfo(data);
		await push('/patients/new/appointment-info');
		setLoading(false);
	}

	return (
		<AddPatientLayout>
			<div
				className="w-11/12 max-w-2xl mx-auto bg-background border border-input shadow-3xl py-8 rounded-lg h-full my-2"
			>
				<div className='max-w-xl w-10/12 mx-auto'>
					<h1 className="mb-6">
						Personal information
					</h1>
					<PersonalInformation
						defaultValues={personalInfo}
						onSubmit={onPersonalInformationSubmit}
						loading={loading}
					/>
				</div>
			</div>
		</AddPatientLayout>
	)
}
