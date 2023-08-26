import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";
import { MakeGetUserProfileUseCase } from "@/server/use-cases/factories/make-get-user-profile-use-case";
import { GetUserProfileUseCaseRequest } from "@/server/use-cases/users/get-user-profile";

const getUserProfileUseCase = MakeGetUserProfileUseCase();

export const appointmentsRouter = createTRPCRouter({
	get: protectedProcedure
		.input(GetUserProfileUseCaseRequest)
		.query(async ({ input }) => {
			const user = await getUserProfileUseCase.execute(input);

			return {
				user,
			};
		}),
});
