export abstract class BaseCustomError extends Error {
	abstract statusCode: number;

	// constructor(message: string) {
	// 	super(message);

	// 	Object.setPrototypeOf(this, BaseCustomError.prototype);
	// }
	constructor(err: unknown | string) {
		if (err instanceof Error) super(err.message);
		else super(err as string);

		Object.setPrototypeOf(this, BaseCustomError.prototype);
	}

	// abstract serializeErrors(): { message: string; field?: string }[];
	abstract serializeErrors(): { error: boolean; message: string | string[]; field?: string };
}
