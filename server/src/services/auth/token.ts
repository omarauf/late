import { sign, SignOptions, verify } from 'jsonwebtoken';
import { StrategyOptions } from 'passport-jwt';

import { CookieStrategyOptions } from './strategies/cookie';

interface refreshTokenPayload {
	userId: string;
	tokenVersion: number;
}

export class TokenService {
	private readonly jwtStrategyOptions: StrategyOptions;
	private readonly cookieStrategyOptions: CookieStrategyOptions;

	// access token options
	private readonly aTSignOptions: SignOptions;

	// refresh token options
	private readonly rTSignOptions: SignOptions;

	public constructor(jwtS: StrategyOptions, cookieS: CookieStrategyOptions) {
		this.jwtStrategyOptions = jwtS;
		this.cookieStrategyOptions = cookieS;

		this.aTSignOptions = { audience: jwtS.audience, issuer: jwtS.issuer, expiresIn: '15m' };

		this.rTSignOptions = { audience: jwtS.audience, issuer: jwtS.issuer, expiresIn: '7d' };
	}

	public createAccessToken(userId: string, isAdmin: boolean): string {
		return sign({ userId, isAdmin }, this.jwtStrategyOptions.secretOrKey as string, this.aTSignOptions);
	}

	public createRefreshToken(userId: string, tokenVersion: number): string {
		return sign({ userId, tokenVersion }, this.cookieStrategyOptions.jwtSecretOrKey as string, this.rTSignOptions);
	}

	public verifyRefreshToken(token: string): refreshTokenPayload {
		try {
			return verify(token, this.cookieStrategyOptions.jwtSecretOrKey as string) as refreshTokenPayload;
		} catch (error) {
			throw error;
		}
	}
}
