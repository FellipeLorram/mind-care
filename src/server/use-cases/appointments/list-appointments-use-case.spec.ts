import { beforeEach, describe, expect, it } from 'vitest';
import { ListAppointmentsUseCase } from './list-appointments';
import { InMemoryAppointmentsRepository } from '@/server/repositories/in-memory/in-memory-appointments-repository';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/server/repositories/in-memory/in-memory-users-repository';
import { InavalidPageError } from '../errors/invalid-page-error';

let sut: ListAppointmentsUseCase;
let patientId: string;
let userId: string;

describe('List Appointments Use Case', () => {
	beforeEach(async () => {
		const appointmentRepository = new InMemoryAppointmentsRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const usersRepository = new InMemoryUsersRepository();

		sut = new ListAppointmentsUseCase(
			appointmentRepository,
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
			await appointmentRepository.create({
				patient_id: patientId,
				appointment_time: new Date(),
			});
		}

	});

	it('should be able to list appointments', async () => {
		const { appointments } = await sut.execute({
			patientId,
			userId,
			page: 1
		});

		expect(appointments).toHaveLength(20);
	});

	it('should not be able to list appointments with invalid user', async () => {
		await expect(() => sut.execute({
			patientId,
			userId: 'invalid-user',
			page: 1
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to list appointments with invalid patient', async () => {
		await expect(() => sut.execute({
			patientId: 'invalid-patient',
			userId,
			page: 2
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to list appointments with invalid page', async () => {
		await expect(() => sut.execute({
			patientId,
			userId,
			page: 0
		})).rejects.toBeInstanceOf(InavalidPageError);
	});
});
