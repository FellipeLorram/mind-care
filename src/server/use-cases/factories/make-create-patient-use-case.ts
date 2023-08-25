import { PrismaUserRepository } from '@/server/repositories/prisma/prisma-user-repository';
import { CreatePatientUseCase } from '../patients/create-patient';
import { PrismaPatientRepository } from '@/server/repositories/prisma/prisma-patient-repository';

export function MakeCreatePatientUseCase() {
	return new CreatePatientUseCase(
		new PrismaPatientRepository(),
		new PrismaUserRepository(),
	);
}