import { describe, it, beforeEach, expect } from 'vitest';
import { ListAllAppointmentsNotesUseCase } from './list-all-appointments-notes';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InMemoryAppointmentNotesRepository } from '@/server/repositories/in-memory/in-memory-notes-repository';
import { InavalidCredentialsError } from '../../errors/invalid-credentials-error';

let sut: ListAllAppointmentsNotesUseCase;
let patientId: string;
let userId: string;

describe('List all appointments notes use case', () => {
	beforeEach(async () => {
		const appointmentNotesRepository = new InMemoryAppointmentNotesRepository();
		const appointmentRepository = new InMemoryAppointmentsRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const usersRepository = new InMemoryUsersRepository();

		sut = new ListAllAppointmentsNotesUseCase(
			appointmentNotesRepository,
			usersRepository,
			patientRepository
		);

		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		userId = user.id;

		const patient = await patientRepository.create({
			user_id: userId,
			age: 10,
			name: 'john doe',
			modality: 'Presencial'
		});

		patientId = patient.id;

		for (let i = 0; i < 30; i++) {
			const appointment = await appointmentRepository.create({
				patient_id: patientId,
				appointment_time: new Date(),
			});

			await appointmentNotesRepository.create({
				appointment_id: appointment.id,
				content: 'note',
				patient_id: patientId,
			});
		}
	});


	it('should be able to list all appointments notes', async () => {
		const { notes } = await sut.execute({
			patient_id: patientId,
			user_id: userId,
		});

		expect(notes).toHaveLength(30);
	});

	it('should not be able to list appointments notes with invalid patient', async () => {
		await expect(() => sut.execute({
			patient_id: 'invalid-patient',
			user_id: userId,
		})).rejects.toBeInstanceOf(InavalidCredentialsError);
	});

	it('should not be able to list appointments notes with invalid user', async () => {
		await expect(() => sut.execute({
			patient_id: patientId,
			user_id: 'userId',
		})).rejects.toBeInstanceOf(InavalidCredentialsError);
	});
});
