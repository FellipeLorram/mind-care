import { PrismaUserRepository } from '@/server/repositories/prisma/prisma-user-repository';
import { ListPatientsUseCase } from '../patients/list-patients';
import { PrismaPatientRepository } from '@/server/repositories/prisma/prisma-patient-repository';

export function MakeListPatientsUseCase() {
	return new ListPatientsUseCase(
		new PrismaPatientRepository(),
		new PrismaUserRepository(),
	);
}