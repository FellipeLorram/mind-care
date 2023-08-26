import { createTRPCRouter } from "@/server/api/trpc";
import { appointmentsRouter } from "./routers/appointmentsRouter";
import { patientsRouter } from "./routers/patientsRouter";
import { usersRouter } from "./routers/usersRouter";

export const appRouter = createTRPCRouter({
  appointments: appointmentsRouter,
  patients: patientsRouter,
  usersRouter: usersRouter
});

export type AppRouter = typeof appRouter;
