import {
	type PatientAppointmentInfoSchemaType,
	type PatientMedicalInfoSchemaType,
	type PatientPersonalInfoSchemaType,
	type PatientNotesSchemaType,
} from "@/components/forms/patient-form/schema";
import { atom, useAtom } from "jotai";

export const personalInfoAtom = atom<PatientPersonalInfoSchemaType>({
	name: '',
	address: '',
	age: 0,
	birth_date: '',
	email: '',
	phones: [],
});

export const medicalInfoAtom = atom<PatientMedicalInfoSchemaType>({});

export const appointmentInfoAtom = atom<PatientAppointmentInfoSchemaType>({
	modality: 'online',
	appointment_day: 'monday',
	appointment_from: '',
	appointment_to: '',
});

export const patientNotesAtom = atom<PatientNotesSchemaType>({
	content: '',
	id: '',
	patient_id: '',
	
});

export function usePatientContext() {
	const [personalInfo, setPersonalInfo] = useAtom(personalInfoAtom);
	const [medicalInfo, setMedicalInfo] = useAtom(medicalInfoAtom);
	const [appointmentInfo, setAppointmentInfo] = useAtom(appointmentInfoAtom);

	const updatePersonalInfo = (data: PatientPersonalInfoSchemaType) => {
		setPersonalInfo(data);
	};

	const updateMedicalInfo = (data: PatientMedicalInfoSchemaType) => {
		setMedicalInfo(data);
	};

	const updateAppointmentInfo = (data: PatientAppointmentInfoSchemaType) => {
		setAppointmentInfo(data);
	};

	const clearPatientContext = () => {
		setPersonalInfo({
			name: '',
			address: '',
			age: 0,
			birth_date: '',
			email: '',
			phones: [],
		});
		setMedicalInfo({});
		setAppointmentInfo({
			modality: 'online',
			appointment_day: 'monday',
			appointment_from: '',
			appointment_to: '',
		});
	}

	return {
		personalInfo,
		medicalInfo,
		appointmentInfo,
		updatePersonalInfo,
		updateMedicalInfo,
		updateAppointmentInfo,
		clearPatientContext,
	};
}
