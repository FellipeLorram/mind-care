import React from 'react'
import { AppointmentInformationPage } from './appointment-information'
import { MedicalInformationPage } from './medical-information'
import { NotesPage } from './notes'
import { PersonalInformationPage } from './personal-information'

export type ComponentNames = 'personal-information' | 'appointment-information' | 'medical-information' | 'notes'

const Components = {
	'personal-information': <PersonalInformationPage />,
	'appointment-information': <AppointmentInformationPage />,
	'medical-information': <MedicalInformationPage />,
	'notes': <NotesPage />
}

interface ComponentTreeProps {
	component: ComponentNames
}

export function ComponentTree({ component }: ComponentTreeProps) {
	return Components[component]
}
