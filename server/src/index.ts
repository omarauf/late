import 'reflect-metadata';

// Set env variables from .env file
import { config } from 'dotenv';

config();

import express from 'express';

import { connect } from 'mongoose';

import { createServer, Server as HttpServer } from 'http';

import { env } from './config/globals';
import { logger } from './config/logger';

import { Server } from './server';
import { RedisService } from './services/redis';

// Startup
try {
	// Connect db
	logger.info('Initializing mongoose connection...');

	connect(`mongodb://${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@${env.MONGODB_URL}:${env.MONGODB_PORT}`);

	// Connect redis
	logger.info('Initializing redis connection...');
	RedisService.connect();

	// Init express server
	const app: express.Application = new Server().app;
	const server: HttpServer = createServer(app);

	// Start express server
	server.listen(env.NODE_PORT);

	server.on('listening', () => {
		logger.info(
			`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode run by ${env.NODE_RUN_BY} v: ${env.NODE_V}`
		);
		
		console.log(
			`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode run by ${env.NODE_RUN_BY} v: ${env.NODE_V}`
		);
	});

	server.on('close', () => {
		RedisService.disconnect();
		logger.info('node server closed');
	});
} catch (err) {
	if (err instanceof Error) {
		logger.error(err.stack);
	}
}
