// Environment variables imported from .env file

let _MONGO_URL;

if (process.env.NODE_ENV !== 'test') {
	if (!process.env.RUN_BY) throw new Error('RUN_BY must be defined');
	if (!process.env.REDIS_URL) throw new Error('REDIS_URL must be defined');
	if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
	if (!process.env.COOKIE_KEY) throw new Error('COOKIE_KEY must be defined');
}

if (process.env.NODE_ENV === 'development') {
	if (!process.env.MONGODB_USERNAME) throw new Error('MONGODB_USERNAME must be defined');
	if (!process.env.MONGODB_PASSWORD) throw new Error('MONGODB_PASSWORD must be defined');
	if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL must be defined');
	if (!process.env.MONGODB_PORT) throw new Error('MONGODB_PORT must be defined');

	const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_URL, MONGODB_PORT } = process.env;
	_MONGO_URL = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}:${MONGODB_PORT}`;
}

if (process.env.NODE_ENV === 'production') {
	if (!process.env.MONGO_URL) throw new Error('MONGO_URL must be defined');
	_MONGO_URL = process.env.MONGO_URL;
}

export const env = {
	// Node
	NODE_ENV: process.env.NODE_ENV || 'development',
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 4000,
	RUN_BY: process.env.RUN_BY || 'local',
	VERSION: process.env.npm_package_version || 'undefined',

	// Auth
	JWT_KEY: process.env.JWT_KEY || 'secret',
	COOKIE_KEY: process.env.COOKIE_KEY || 'secret',

	// Redis
	REDIS_URL: process.env.REDIS_URL || '',

	// Database
	MONGO_URL: _MONGO_URL || ''
};
