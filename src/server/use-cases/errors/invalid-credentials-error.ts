export class InavalidCredentialsError extends Error {
	constructor() {
		super('Invalid credentials');
	}
}
