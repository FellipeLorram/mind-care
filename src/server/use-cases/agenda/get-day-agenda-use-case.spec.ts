import { describe, it, expect, beforeEach } from 'vitest';
import { GetDayAgendaUseCase } from './get-day-agenda';
import { testAssets } from '@/lib/test-assets';
import { type PatientRepository } from '@/server/repositories/patient-repository';
import { InMemoryPatientsRepository } from '@/server/repositories/in-memory/in-memory-patients-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let sut: GetDayAgendaUseCase;
let userId: string;
let patientsRepository: PatientRepository;

describe('Get Day Agenda Use Case', () => {
	beforeEach(async () => {
		const { usersRepository } = testAssets();
		patientsRepository = new InMemoryPatientsRepository()

		sut = new GetDayAgendaUseCase(
			usersRepository,
			patientsRepository
		);

		const user = await usersRepository.create({
			name: 'any_name',
			email: 'any_email',
		});

		userId = user.id;
	})

	it('Should be able to get days agenda', async () => {
		await patientsRepository.create({
			name: 'any_name',
			age: 10,
			modality: 'any_modality',
			address: 'any_address',
			observation: 'any_observation',
			birthDate: new Date(),
			email: 'any_email@email.com',
			gender: 'male',
			nationality: 'any_nationality',
			appointment_from: '10:00',
			appointment_to: '10:45',
			appointment_day: 'monday',
			user_id: userId,
		});

		await patientsRepository.create({
			name: 'other_name',
			age: 10,
			modality: 'any_modality',
			address: 'any_address',
			observation: 'any_observation',
			birthDate: new Date(),
			email: 'any_email',
			gender: 'male',
			nationality: 'any_nationality',
			appointment_from: '11:00',
			appointment_to: '11:45',
			appointment_day: 'monday',
			user_id: userId,
		});

		const { agenda } = await sut.execute({
			userId,
			day: 'monday',
		});

		expect(agenda).toHaveLength(2);
		expect(agenda).toEqual([
			{
				patient: {
					id: '1',
					name: 'any_name',
				},
				appointment: {
					from: '10:00',
					to: '10:45',
					day: 'monday',
				},
			},
			{
				patient: {
					id: '2',
					name: 'other_name',
				},
				appointment: {
					from: '11:00',
					to: '11:45',
					day: 'monday',
				},
			},
		]);
	});

	it('Should not be able to get days agenda with invalid user id', async () => {
		await expect(() => sut.execute({
			userId: 'any_user_id',
			day: 'monday',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
})
