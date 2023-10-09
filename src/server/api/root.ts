import { createTRPCRouter } from "@/server/api/trpc";
import { appointmentsRouter } from "./routers/appointments-router";
import { patientsRouter } from "./routers/patients-router";
import { usersRouter } from "./routers/users-router";
import { agendaRouter } from "./routers/agenda-router";
import { detachedNotesRouter } from "./routers/detached-notes-router";

export const appRouter = createTRPCRouter({
  appointments: appointmentsRouter,
  patients: patientsRouter,
  users: usersRouter,
  agenda: agendaRouter,
  detachedNotes: detachedNotesRouter,
});

export type AppRouter = typeof appRouter;
