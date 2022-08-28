import { BaseCustomError } from './base';

export class NotFoundError extends BaseCustomError {
	statusCode = 404;

	constructor() {
		super('Route not found');

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		return { error: true, message: 'Not found' };
	}
}
