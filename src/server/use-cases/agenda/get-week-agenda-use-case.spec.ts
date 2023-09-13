import { testAssets } from '@/lib/test-assets';
import { expect, it, describe, beforeAll } from 'vitest';
import { GetWeekAgendaUseCase } from './get-week-agenda';
import { type daysOfWeekType } from '@/lib/days-of-week';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let sut: GetWeekAgendaUseCase;
let userId: string;

describe('Get All Week Agenda Use Case', () => {
	beforeAll(async () => {
		const {
			usersRepository,
			patientsRepository,
		} = testAssets();

		sut = new GetWeekAgendaUseCase(usersRepository, patientsRepository);

		const user = await usersRepository.create({
			name: 'any_name',
			email: 'any_email',
		});

		userId = user.id;

		const daysOfWeek: daysOfWeekType[] = ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

		for (let i = 0; i < 10; i++) {
			await patientsRepository.create({
				name: 'any_name',
				age: 10,
				modality: 'any_modality',
				appointment_day: daysOfWeek[i % 7]!,
				appointment_from: `0${i}:00`,
				appointment_to: `0${i + 1}:00`,
				user_id: user.id,
			});
		}

		await patientsRepository.create({
			name: 'any_name',
			age: 10,
			modality: 'any_modality',
			appointment_day: 'monday',
			appointment_from: '08:00',
			appointment_to: '09:00',
			user_id: userId,
		});
	});

	it('should return an object with all days of the week', async () => {
		const { agenda } = await sut.execute({
			userId,
		});

		expect(Object.keys(agenda).length).toBe(7);
		expect(agenda.monday).toHaveLength(1);
	});

	it('should throw if user does not exist', async () => {
		await expect(sut.execute({
			userId: 'invalid_user_id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});

