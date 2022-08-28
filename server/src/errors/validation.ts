import { ValidationError as VE } from 'express-validator';

import { BaseCustomError } from './base';

export class ValidationError extends BaseCustomError {
	statusCode = 400;
	validationErrors: VE[];

	constructor(validationErrors: VE[]) {
		super('Validation Errors');
		this.validationErrors = validationErrors;
		Object.setPrototypeOf(this, ValidationError.prototype);
	}

	serializeErrors() {
		return { error: true, message: this.message, validationErrors: this.validationErrors };
	}
}
