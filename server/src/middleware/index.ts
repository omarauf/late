import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { json, NextFunction, Request, Response, Router } from 'express';

import { AuthService } from '../services/auth';
import { UtilityService } from '../services/utility';

import { env } from '../config/globals';
import { BaseCustomError } from '../errors/base';

/**
 * Init Express middleware
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerMiddleware(router: Router): void {
	router.use(helmet());

	if (env.NODE_ENV === 'development') {
		router.use(cors({ origin: 'http://localhost:3000', credentials: true }));
	} else {
		router.use(cors({ origin: ['http://localhost:8080'], credentials: true }));
	}

	router.use(json());
	router.use(compression());
	router.use(cookieParser());

	// Setup passport strategies
	new AuthService().initStrategies();
}

/**
 * Init Express error handler
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerErrorHandler(router: Router): Response | void {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
		if (err instanceof BaseCustomError) {
			return res.status(err.statusCode).send(err.serializeErrors());
		}
		UtilityService.handleError(err);

		return res.status(500).json({
			error: err.message || err,
			status: 500
		});
	});
}
