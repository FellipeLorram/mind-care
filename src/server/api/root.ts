import { createTRPCRouter } from "@/server/api/trpc";
import { appointmentsRouter } from "./routers/appointmentsRouter";
import { patientsRouter } from "./routers/patientsRouter";

export const appRouter = createTRPCRouter({
  appointments: appointmentsRouter,
  patients: patientsRouter,
});

export type AppRouter = typeof appRouter;
