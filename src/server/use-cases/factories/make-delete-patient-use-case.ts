import { PrismaUserRepository } from '@/server/repositories/prisma/prisma-user-repository';
import { DeletePatientUseCase } from '../patients/delete-patient';
import { PrismaPatientRepository } from '@/server/repositories/prisma/prisma-patient-repository';

export function MakeDeletePatientUseCase() {
	return new DeletePatientUseCase(
		new PrismaPatientRepository(),
		new PrismaUserRepository(),
	);
}