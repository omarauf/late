// Set env to test
process.env.NODE_ENV = 'test';

// Set env variables from .env file
import { config } from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import express from 'express';
import { createServer, Server as HttpServer } from 'http';
import redis from 'redis-mock';

config();

import { RedisService } from '../services/redis';
import { Server } from '../server';
import { env } from '../config/globals';
import { IUser } from '../components/user/interface';

/**
 * TestFactory
 * - Loaded in each unit test
 * - Starts server and DB connection
 */

// beforeEach(async () => {});

export class TestFactory {
	private _app: express.Application;
	private _mongo: MongoMemoryServer;
	private _server: HttpServer;
	private _client: redis.RedisClient;

	public get app(): supertest.SuperTest<supertest.Test> {
		return supertest(this._app);
	}

	public get server(): HttpServer {
		return this._server;
	}

	public async init(): Promise<void> {
		// logger.info('Running startup for test case');
		await this.startup();
	}

	/**
	 * Close server and DB connection
	 */
	public async close(): Promise<void> {
		this._server.close();
		mongoose.connection.close();
		RedisService.disconnect();
	}

	/**
	 * Connect to DB and start server
	 */
	private async startup(): Promise<void> {
		this._mongo = await MongoMemoryServer.create();
		const mongoUri = this._mongo.getUri();
		await mongoose.connect(mongoUri);
		this._client = redis.createClient();
		RedisService.connect(this._client);
		this._app = new Server().app;
		this._server = createServer(this._app).listen(env.NODE_PORT);
	}

	public register = async () => {
		const user = {
			email: 'test@test.com',
			password: 'password',
			firstName: 'omar',
			lastName: 'auf',
			company: 'Fuck',
			phone: '0 531 501 36 73',
			isAdmin: true
		};

		const response = await supertest(this._app).post('/v1/auth/register').send(user);

		return response;
	};

	public signin = async (user?: IUser) => {
		const email = user?.email || 'test@test.com';
		const password = user?.password || 'password';

		const response = await supertest(this._app).post('/v1/auth/signin').send({
			email,
			password
		});

		return response.body;
	};
}

// declare global {
// 	namespace NodeJS {
// 		interface Global {
// 			signin(): Promise<string[]>;
// 		}
// 	}
// }

// declare global {
// 	var signin: () => Promise<string[]>;
// }

// afterAll(async () => {
// 	await mongoose.connection.close();
// });

// Setup MongoDB before running tests
// beforeAll(async () => {
// 	const mongo = await MongoMemoryServer.create();
// 	const mongoUri = mongo.getUri();
// 	await mongoose.connect(mongoUri);
// });

// global.signin = async () => {
// 	const email = 'test@test.com';
// 	const password = 'password';

// 	const response = await request(Server)
// 		.post('/v1/auth/signin')
// 		.send({
// 			email,
// 			password
// 		})
// 		.expect(201);

// 	// const cookie = response.get('Set-Cookie');

// 	return response.body.token;
// };
