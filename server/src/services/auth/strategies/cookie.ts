import { bind } from 'decko';
import { Handler, NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { default as CookieSt } from 'passport-cookie';
import { BasicStrategyOptions } from 'passport-http';
import { VerifiedCallback } from 'passport-jwt';
import { UnauthorizedError } from '../../../errors/unauthorized';
import { TokenService } from '../token';
import { BaseStrategy } from './base';

export interface CookieStrategyOptions extends BasicStrategyOptions<true> {
	cookieName: string;
	signed: boolean;
	jwtSecretOrKey: string;
}

/**
 * Passport Cookie Refresh Authentication
 *
 * - The client get new access token by sending a refresh token
 * - If the refresh token is successfully verified
 * - a new access and refresh token is generated and sent to the client
 */
export class CookieStrategy extends BaseStrategy {
	private strategyOptions: CookieStrategyOptions;
	private tokenService: TokenService;

	public constructor(strategyOptions: CookieStrategyOptions, tokenService: TokenService) {
		super();
		this.strategyOptions = strategyOptions;
		this.tokenService = tokenService;
		this._strategy = new CookieSt(this.strategyOptions, this.verify);
	}

	public isAuthorized(req: Request, res: Response, next: NextFunction): Handler | void {
		try {
			passport.authenticate('cookie', { session: false }, (err, user, info) => {
				if (err) {
					return next(err);
				}
				if (info) {
					switch (info) {
						case 'Refresh Token Has Been Revoked':
							throw new UnauthorizedError('Unable to authenticate token');
						case 'User not found':
							throw new UnauthorizedError('User not found!');
					}
				}

				req.user = user;

				return next();
			})(req, res, next);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Verify incoming payloads from request -> authenticate passport in isAuthorized()
	 * if token is valid, return user
	 * @param token JWT payload
	 * @returns
	 */
	@bind
	// bind this to the class because this function will be called from passport.authenticate()
	// so we will not have access to this.tokenService
	private async verify(req: Request, token: string, next: VerifiedCallback): Promise<void> {
		try {
			const payload = this.tokenService.verifyRefreshToken(token);
			const user = await this.userRepo.findById(payload.userId);

			if (!user) {
				return next(null, null, 'User not found');
			}

			if (user.tokenVersion !== payload.tokenVersion) {
				return next(null, null, 'Refresh Token Has Been Revoked');
			}

			return next(null, user);
		} catch (err) {
			return next(err);
		}
	}
}
