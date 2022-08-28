import passport from 'passport';
import { bind } from 'decko';
import { Handler, NextFunction, Request, Response } from 'express';
import { Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';

import { BaseStrategy, Payload } from './base';

/**
 * Passport JWT Authentication
 *
 * - The client signs in via /signin endpoint
 * - If the signin is successfully a JWT is returned
 * - This JWT is used inside the request header for later requests
 */
export class JwtStrategy extends BaseStrategy {
	private strategyOptions: StrategyOptions;

	public constructor(strategyOptions: StrategyOptions) {
		super();
		this.strategyOptions = strategyOptions;
		this._strategy = new Strategy(this.strategyOptions, this.verify);
	}

	/**
	 * Middleware for checking if a user is authorized to access the endpoint
	 * first to verify the token in authorization header and and decoded using the signed key
	 * 		all this happen by passport.authenticate('jwt', { session: false })
	 * if token is valid, go to verify then isAuthorized
	 * if token is not valid, it will skip verify function and go to complete isAuthorized
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns Returns if user is authorized
	 */
	public isAuthorized(req: Request, res: Response, next: NextFunction): Handler | void {
		try {
			passport.authenticate('jwt', { session: false }, (err, user, info) => {
				// internal error
				if (err) {
					return next(err);
				}
				if (info) {
					switch (info.message) {
						case 'No auth token':
							throw Error('Unauthorized!');
						case 'jwt expired':
							throw Error('Unauthorized!');
						case 'jwt malformed':
							throw Error('Unauthorized!');
						case 'invalid signature':
							throw Error('Unauthorized!');
					}
				}

				if (!user) {
					throw Error('Unauthorized!');
				}

				// success - store user in req scope
				req.user = user;

				return next();
			})(req, res, next);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Verify incoming payloads from request -> validation in isAuthorized()
	 *
	 * @param payload JWT payload
	 * @param next Express next
	 * @returns
	 */
	@bind
	private async verify(payload: Payload, next: VerifiedCallback): Promise<void> {
		try {
			// pass error == null on error otherwise we get a 500 error instead of 401

			const user = await this.userRepo.findById(payload.userId);

			if (!user) {
				return next(null, null);
			}

			// await this.setPermissions(user);

			return next(null, user);
		} catch (err) {
			return next(err);
		}
	}
}
