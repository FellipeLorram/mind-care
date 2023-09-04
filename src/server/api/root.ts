import { createTRPCRouter } from "@/server/api/trpc";
import { appointmentsRouter } from "./routers/appointments-router";
import { patientsRouter } from "./routers/patients-router";
import { usersRouter } from "./routers/users-router";
import { agendaRouter } from "./routers/agenda-router";

export const appRouter = createTRPCRouter({
  appointments: appointmentsRouter,
  patients: patientsRouter,
  users: usersRouter,
  agenda: agendaRouter
});

export type AppRouter = typeof appRouter;
