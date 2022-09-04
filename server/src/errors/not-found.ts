import { BaseCustomError } from './base';

export class NotFoundError extends BaseCustomError {
	statusCode = 404;

	constructor(err: unknown = 'Route not found') {
		super(err);
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		return { error: true, message: this.message };
	}
}
