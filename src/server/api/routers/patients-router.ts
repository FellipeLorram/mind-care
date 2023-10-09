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
		.input(CreatePatientUseCaseRequest.omit({ user_id: true }))
		.mutation(async ({ input, ctx }) => {
			const patient = await createPatientUseCase.execute({
				...input,
				user_id: ctx.session.user.id,
			});

			return patient
		}),

	delete: protectedProcedure
		.input(DeletePatientUseCaseRequest.omit({ user_id: true }))
		.mutation(async ({ input, ctx }) => {
			await deletePatientUseCase.execute({
				...input,
				user_id: ctx.session.user.id,
			});
		}),

	getProfile: protectedProcedure
		.input(GetPatientProfileUseCaseRequest.omit({ user_id: true }))
		.query(async ({ input, ctx }) => {
			const patient = await getPatientProfileUseCase.execute({
				...input,
				user_id: ctx.session.user.id,
			});

			return patient
		}),

	list: protectedProcedure
		.input(ListPatientsUseCaseRequest.omit({ user_id: true }))
		.query(async ({ input, ctx }) => {
			const patients = await listPatientsUseCase.execute({
				...input,
				user_id: ctx.session.user.id,
			});

			return patients
		}),

	update: protectedProcedure
		.input(UpdatePatientUseCaseRequest.omit({ user_id: true }))
		.mutation(async ({ input, ctx }) => {
			const patient = await updatePatientUseCase.execute({
				...input,
				user_id: ctx.session.user.id,
			});

			return patient
		}),
});
