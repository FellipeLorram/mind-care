import { prisma } from '@/server/db';
import { type AppointmentRepository } from '../appointment-repository';
import { type Prisma } from '@prisma/client';

export class PrismaAppointmentRepository implements AppointmentRepository {
	async findById(id: string) {
		const appointment = await prisma.appointment.findUnique({
			where: { id },
		});

		return appointment;
	}

	async create(data: Prisma.AppointmentUncheckedCreateInput) {
		const appointment = await prisma.appointment.create({
			data,
		});

		return appointment;
	}

	async update(id: string, data: Prisma.AppointmentUncheckedUpdateInput) {
		const appointment = await prisma.appointment.update({
			where: { id },
			data,
		});

		return appointment;
	}

	async list(id: string, page: number) {
		const appointments = await prisma.appointment.findMany({
			where: { patient_id: id },
			skip: (page - 1) * 10,
			take: 10,
		});

		return appointments;
	}

	async delete(id: string) {
		await prisma.appointment.delete({
			where: { id },
		});
	}
}
