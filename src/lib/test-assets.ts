import { InMemoryAppointmentsRepository } from "@/server/repositories/in-memory/in-memory-appointments-repository";
import { InMemoryDetachedNotesRepository } from "@/server/repositories/in-memory/in-memory-detached-notes-repository";
import { InMemoryAppointmentNotesRepository } from "@/server/repositories/in-memory/in-memory-notes-repository";
import { InMemoryPatientsRepository } from "@/server/repositories/in-memory/in-memory-patients-repository";
import { InMemoryUsersRepository } from "@/server/repositories/in-memory/in-memory-users-repository";

export function testAssets() {
	return {
		usersRepository: new InMemoryUsersRepository(),
		patientsRepository: new InMemoryPatientsRepository(),
		appointmentsRepository: new InMemoryAppointmentsRepository(),
		appointmentsNotesRepository: new InMemoryAppointmentNotesRepository(),
		detachedNotesRepository: new InMemoryDetachedNotesRepository(),
	}
}
