import { BaseCustomError } from './base';

export class UnauthorizedError extends BaseCustomError {
	statusCode = 401;

	constructor(err: unknown) {
		super(err);
		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}

	serializeErrors() {
		return { error: true, message: this.message };
	}
}
