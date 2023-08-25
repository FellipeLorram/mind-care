import { beforeEach, describe, expect, it } from 'vitest';
import { ListAppointmentNotesUseCase } from './list-appointment-notes';
import { InMemoryAppointmentNotesRepository } from '@/server/repositories/in-memory/in-memory-notes-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { InavalidPageError } from '@/server/use-cases/errors/invalid-page-error';
import { ResourceNotFoundError } from '@/server/use-cases/errors/resource-not-found-error';

let sut: ListAppointmentNotesUseCase;
let userId: string;
let patientId: string;
let appointmentId: string;

describe('List Appointment Notes Use Case', () => {
	beforeEach(async () => {
		const appointmentNoteRepository = new InMemoryAppointmentNotesRepository();
		const usersRepository = new InMemoryUsersRepository();
		const patientsRepository = new InMemoryPatientsRepository();
		const appointmentRepository = new InMemoryAppointmentsRepository();

		sut = new ListAppointmentNotesUseCase(
			appointmentNoteRepository,
			usersRepository,
			patientsRepository,
			appointmentRepository,
		);

		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		userId = user.id;

		const patient = await patientsRepository.create({
			user_id: userId,
			age: 10,
			name: 'john doe',
			appointment_duration: 30,
			appointment_time: new Date(),
			modality: 'Presencial'
		});

		patientId = patient.id;

		const appointment = await appointmentRepository.create({
			patient_id: patientId,
			appointment_time: new Date(),
		});

		appointmentId = appointment.id;

		for (let i = 0; i < 30; i++) {
			await appointmentNoteRepository.create({
				content: 'any_content',
				appointment_id: appointmentId,
			});
		}

	});

	it('should list all appointment notes', async () => {
		const { notes } = await sut.execute({
			userId,
			patientId,
			appointmentId,
			page: 1,
		});

		expect(notes).toHaveLength(20);
	});

	it('should list appointment notes with pagination', async () => {
		const { notes } = await sut.execute({
			userId,
			patientId,
			appointmentId,
			page: 2,
		});

		expect(notes).toHaveLength(10);
	});

	it('should not be able to list appointment notes with invalid page', async () => {
		await expect(sut.execute({
			userId,
			patientId,
			appointmentId,
			page: 0,
		})).rejects.toBeInstanceOf(InavalidPageError);
	});

	it('should not be able to list appointment notes with invalid appointment', async () => {
		await expect(sut.execute({
			userId,
			patientId,
			appointmentId: 'invalid_appointment_id',
			page: 1,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to list appointment notes with invalid user', async () => {
		await expect(sut.execute({
			userId: 'invalid_user_id',
			patientId,
			appointmentId,
			page: 1,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to list appointment notes with invalid patient', async () => {
		await expect(sut.execute({
			userId,
			patientId: 'invalid_patient_id',
			appointmentId,
			page: 1,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
