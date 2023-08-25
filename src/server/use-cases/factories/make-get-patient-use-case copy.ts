import { PrismaUserRepository } from '@/server/repositories/prisma/prisma-user-repository';
import { GetPatientProfileUseCase } from '../patients/get-patient-profile';
import { PrismaPatientRepository } from '@/server/repositories/prisma/prisma-patient-repository';

export function MakeGetPatientProfileUseCase() {
	return new GetPatientProfileUseCase(
		new PrismaPatientRepository(),
		new PrismaUserRepository(),
	);
}