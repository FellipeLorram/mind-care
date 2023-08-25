/* eslint-disable @typescript-eslint/require-await */
import { type Patient, type Prisma } from '@prisma/client';
import { type PatientRepository } from '../patient-repository';

export class InMemoryPatientsRepository implements PatientRepository {
	private patients: Patient[];

	constructor() {
		this.patients = [];
	}

	async create(data: Prisma.PatientUncheckedCreateInput) {
		const patient: Patient = {
			address: data.address ? data.address : null,
			age: data.age,
			appointment_duration: data.appointment_duration,
			appointment_time: new Date(data.appointment_time),
			email: data.email ? data.email : null,
			name: data.name,
			gender: data.gender ? data.gender : null,
			modality: data.modality,
			nationality: data.nationality ? data.nationality : null,
			observation: data.observation ? data.observation : null,
			user_id: data.user_id,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: String(this.patients.length + 1),
			birthDate: data.birthDate ? new Date(data.birthDate) : null,
		};

		this.patients.push(patient);

		return patient;
	}

	async update(id: string, patient: Prisma.PatientUncheckedUpdateInput) {
		const patientIndex = this.patients.findIndex((patient) => patient.id === id);

		if (patientIndex < 0) {
			throw new Error('Patient not found');
		}

		this.patients[patientIndex] = {
			...this.patients[patientIndex],
			id: id,
			updatedAt: new Date(),
			createdAt: this.patients[patientIndex]!.createdAt,
			user_id: this.patients[patientIndex]!.user_id,
			address: patient.address ? patient.address as string : this.patients[patientIndex]!.address,
			age: patient.age ? patient.age as number : this.patients[patientIndex]!.age,
			appointment_duration: patient.appointment_duration ? patient.appointment_duration as number : this.patients[patientIndex]!.appointment_duration,
			appointment_time: patient.appointment_time ? new Date(patient.appointment_time as string) : this.patients[patientIndex]!.appointment_time,
			email: patient.email ? patient.email as string : this.patients[patientIndex]!.email,
			name: patient.name ? patient.name as string : this.patients[patientIndex]!.name,
			birthDate: patient.birthDate ? new Date(patient.birthDate as string) : this.patients[patientIndex]!.birthDate,
			gender: patient.gender ? patient.gender as string : this.patients[patientIndex]!.gender,
			modality: patient.modality ? patient.modality as string : this.patients[patientIndex]!.modality,
			nationality: patient.nationality ? patient.nationality as string : this.patients[patientIndex]!.nationality,
			observation: patient.observation ? patient.observation as string : this.patients[patientIndex]!.observation,
		};

		return this.patients[patientIndex]!;
	}

	async delete(id: string) {
		const patientIndex = this.patients.findIndex((patient) => patient.id === id);

		if (patientIndex < 0) {
			return;
		}

		this.patients.splice(patientIndex, 1);
	}

	async findById(id: string) {
		const patient = this.patients.find((patient) => patient.id === id);
		return patient ?? null;
	}

	async list(userId: string, page: number) {
		const patients = this.patients.filter((patient) => patient.user_id === userId);

		return patients.slice((page - 1) * 20, page * 20);
	}
} 