/* eslint-disable @typescript-eslint/require-await */
import { type Appointment, type Prisma } from '@prisma/client';
import { type AppointmentRepository } from '../appointment-repository';

export class InMemoryAppointmentsRepository implements AppointmentRepository {
	private Appointments: Appointment[];

	constructor() {
		this.Appointments = [];
	}

	async create(data: Prisma.AppointmentUncheckedCreateInput) {
		const appointment: Omit<Appointment, 'Note'> = {
			...data,
			modality: data.modality ?? null,
			duration: data.duration ?? null,
			communication_effectiveness: data.communication_effectiveness ?? null,
			engagement_level: data.engagement_level ?? null,
			progress: data.progress ?? null,
			session_outcome: data.session_outcome ?? null,
			treatment_adherence: data.treatment_adherence ?? null,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: String(this.Appointments.length + 1),
		};

		this.Appointments.push(appointment as Appointment);

		return appointment as Appointment;
	}

	async list(patientId: string, page: number) {
		const appointments = this.Appointments.filter((Appointment) => Appointment.patient_id === patientId);

		return appointments.slice((page - 1) * 20, page * 20);
	}

	async delete(id: string) {
		const AppointmentIndex = this.Appointments.findIndex((Appointment) => Appointment.id === id);

		if (AppointmentIndex < 0) {
			return;
		}

		this.Appointments.splice(AppointmentIndex, 1);
	}

	async findById(id: string) {
		const Appointment = this.Appointments.find((Appointment) => Appointment.id === id);
		return Appointment ?? null;
	}

	async update(id: string, data: Prisma.AppointmentUncheckedUpdateInput) {
		const AppointmentIndex = this.Appointments.findIndex((Appointment) => Appointment.id === id);

		if (AppointmentIndex < 0) {
			throw new Error('Appointment not found');
		}

		const Appointment: Appointment = {
			...this.Appointments[AppointmentIndex],
			...data
		} as Appointment;

		this.Appointments[AppointmentIndex] = Appointment;

		return Appointment;

	}
} 