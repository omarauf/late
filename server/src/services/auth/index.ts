import passport from 'passport';
import { bind } from 'decko';
import { Handler, NextFunction, Request, Response } from 'express';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { validationResult } from 'express-validator';

// import { policy } from '../../config/policy';

import { JwtStrategy } from './strategies/jwt';
import { CookieStrategy, CookieStrategyOptions } from './strategies/cookie';
import { TokenService } from './token';
import { ValidationError } from '../../errors/validation';
import { UnauthorizedError } from '../../errors/unauthorized';
import { IUserDoc } from '../../components/user/interface';

export type PassportStrategy = 'jwt' | 'cookie';

/**
 * AuthService
 *
 * Available passport strategies for authentication:
 *  - JWT (default)
 *
 * Pass a strategy when initializing module routes to setup this strategy for the complete module: Example: new UserRoutes('jwt')
 *
 * To setup a strategy for individual endpoints in a module pass the strategy on isAuthorized call
 * Example: isAuthorized('basic')
 */
export class AuthService {
	private defaultStrategy: PassportStrategy;
	private jwtStrategy: JwtStrategy;
	private cookieStrategy: CookieStrategy;
	readonly tokenService: TokenService;

	private readonly jwtStrategyOptions: StrategyOptions = {
		audience: 'client',
		issuer: 'server',
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: 'my-super-secret-key'
	};

	private readonly cookieStrategyOptions: CookieStrategyOptions = {
		cookieName: 'jid',
		signed: false,
		passReqToCallback: true,
		jwtSecretOrKey: 'my-super-secret-key'
	};

	public constructor(defaultStrategy: PassportStrategy = 'jwt') {
		// Setup default strategy -> use jwt if none is provided
		this.defaultStrategy = defaultStrategy;
		this.tokenService = new TokenService(this.jwtStrategyOptions, this.cookieStrategyOptions);
		this.jwtStrategy = new JwtStrategy(this.jwtStrategyOptions);
		this.cookieStrategy = new CookieStrategy(this.cookieStrategyOptions, this.tokenService);
	}

	/**
	 * Init passport strategies
	 *
	 * @returns
	 */
	public initStrategies(): void {
		passport.use('jwt', this.jwtStrategy.strategy);
		passport.use('cookie', this.cookieStrategy.strategy);
	}

	/**
	 * Setup target passport authorization
	 *
	 * @param strategy Passport strategy
	 * @returns Returns if user is authorized
	 */
	@bind
	public isAuthorized(strategy?: PassportStrategy): Handler {
		return (req: Request, res: Response, next: NextFunction) => {
			try {
				// if (env.NODE_ENV !== 'test') {
				// if no strategy is provided use default strategy
				const tempStrategy: PassportStrategy = strategy || this.defaultStrategy;
				return this.doAuthentication(req, res, next, tempStrategy);
				// }

				return next();
			} catch (err) {
				return next(err);
			}
		};
	}

	/**
	 * Executes the target passport authorization
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @param strategy Passport strategy name
	 * @returns Returns if user is authorized
	 */
	@bind
	private doAuthentication(
		req: Request,
		res: Response,
		next: NextFunction,
		strategy: PassportStrategy
	): Handler | void {
		try {
			switch (strategy) {
				case 'jwt':
					return this.jwtStrategy.isAuthorized(req, res, next);
				case 'cookie':
					return this.cookieStrategy.isAuthorized(req, res, next);
				default:
					throw new Error(`Unknown passport strategy: ${strategy}`);
			}
		} catch (err) {
			throw new UnauthorizedError(err);
		}
	}

	/**
	 * catch if there is an error
	 * @returns
	 */
	@bind
	public validateRequest(req: Request, res: Response, next: NextFunction): Response | void {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new ValidationError(errors.array());
			// return res.status(400).json({ error: errors.array() });
		}

		return next();
	}

	/**
	 * Middleware for verifying user permissions from acl
	 *
	 * @param resource Requested resource
	 * @param action Performed action on requested resource
	 * @returns Returns if action on resource is allowed
	 */
	// public hasPermission(resource: string = '', action: string = ''): Handler {
	public hasPermission(): Handler {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const user = req.user as IUserDoc;

				const access = user.isAdmin;

				// const access: boolean = await policy.isAllowed(id, resource, action);

				// const access = (req.user as IUserDoc)?.role === 'admin';

				if (!access) {
					return res.status(403).json({
						error: 'Missing user rights!'
					});
				}

				return next();
			} catch (err) {
				return next(err);
			}
		};
	}

	/**
	 * Middleware for verifying user is admin
	 *
	 * @returns Returns if user is admin on resource is allowed
	 */
	public adminOnly(): Handler {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const user = req.user as IUserDoc;

				const access = user.isAdmin;

				if (!access) {
					return res.status(403).json({
						error: 'Missing user rights!'
					});
				}

				return next();
			} catch (err) {
				return next(err);
			}
		};
	}
}
