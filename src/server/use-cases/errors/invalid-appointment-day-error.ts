export class InavalidAppointmentDayError extends Error {
	constructor() {
		super('Invalid appointment day');
	}
}
