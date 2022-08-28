// Environment variables imported from .env file

// check environment variables
// if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
if (process.env.NODE_ENV !== "test") {
	if (!process.env.MONGODB_USERNAME) throw new Error('MONGODB_USERNAME must be defined');
	if (!process.env.MONGODB_PASSWORD) throw new Error('MONGODB_PASSWORD must be defined');
	if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL must be defined');
	if (!process.env.MONGODB_PASSWORD) throw new Error('MONGODB_PASSWORD must be defined');
	if (!process.env.REDIS_URL) throw new Error('REDIS_URL must be defined');
	if (!process.env.NODE_RUN_BY) throw new Error('BY must be defined');
	if (!process.env.NODE_V) throw new Error('V must be defined');
}
export const env = {
	REDIS_URL: process.env.REDIS_URL,
	NODE_ENV: process.env.NODE_ENV || 'development',
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3000,
	MONGODB_USERNAME: process.env.MONGODB_USERNAME,
	MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
	MONGODB_URL: process.env.MONGODB_URL,
	MONGODB_PORT: process.env.MONGODB_PORT,
	NODE_RUN_BY: process.env.NODE_RUN_BY,
	NODE_V: process.env.NODE_V,
	JWT_KEY: process.env.JWT_KEY
};
