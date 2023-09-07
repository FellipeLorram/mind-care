import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";
import { MakeCreatePatientUseCase } from "@/server/use-cases/factories/make-create-patient-use-case";
import { MakeDeletePatientUseCase } from "@/server/use-cases/factories/make-delete-patient-use-case";
import { MakeGetPatientProfileUseCase } from "@/server/use-cases/factories/make-get-patient-use-case copy";
import { MakeListPatientsUseCase } from "@/server/use-cases/factories/make-list-patients-use-case";
import { MakeUpdatePatientUseCase } from "@/server/use-cases/factories/make-update-patient-use-case";
import { CreatePatientUseCaseRequest } from "@/server/use-cases/patients/create-patient";
import { DeletePatientUseCaseRequest } from "@/server/use-cases/patients/delete-patient";
import { GetPatientProfileUseCaseRequest } from "@/server/use-cases/patients/get-patient-profile";
import { ListPatientsUseCaseRequest } from "@/server/use-cases/patients/list-patients";
import { UpdatePatientUseCaseRequest } from "@/server/use-cases/patients/update-patient";

const createPatientUseCase = MakeCreatePatientUseCase();
const deletePatientUseCase = MakeDeletePatientUseCase();
const getPatientProfileUseCase = MakeGetPatientProfileUseCase();
const listPatientsUseCase = MakeListPatientsUseCase();
const updatePatientUseCase = MakeUpdatePatientUseCase();

export const patientsRouter = createTRPCRouter({
	create: protectedProcedure
		.input(CreatePatientUseCaseRequest)
		.mutation(async ({ input }) => {
			const patient = await createPatientUseCase.execute(input);

			return {
				patient,
			};
		}),

	delete: protectedProcedure
		.input(DeletePatientUseCaseRequest)
		.mutation(async ({ input }) => {
			await deletePatientUseCase.execute(input);
		}),

	getProfile: protectedProcedure
		.input(GetPatientProfileUseCaseRequest)
		.query(async ({ input }) => {
			const patient = await getPatientProfileUseCase.execute(input);

			return {
				patient,
			};
		}),

	list: protectedProcedure
		.input(ListPatientsUseCaseRequest)
		.query(async ({ input }) => {
			const patients = await listPatientsUseCase.execute(input);

			return {
				patients,
			};
		}),

	update: protectedProcedure
		.input(UpdatePatientUseCaseRequest)
		.mutation(async ({ input }) => {
			const patient = await updatePatientUseCase.execute(input);

			return {
				patient,
			};
		}),
});