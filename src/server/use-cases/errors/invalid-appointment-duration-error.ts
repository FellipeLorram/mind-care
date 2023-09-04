export class InavalidAppointmentDurationError extends Error {
	constructor() {
		super('Invalid appointment duration');
	}
}
