import { PrismaUserRepository } from '@/server/repositories/prisma/prisma-user-repository';
import { UpdatePatientUseCase } from '../patients/update-patient';
import { PrismaPatientRepository } from '@/server/repositories/prisma/prisma-patient-repository';

export function MakeUpdatePatientUseCase() {
	return new UpdatePatientUseCase(
		new PrismaPatientRepository(),
		new PrismaUserRepository(),
	);
}