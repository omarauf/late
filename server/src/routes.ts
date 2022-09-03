import { Request, Response, Router } from 'express';

import { registerApiRoutes } from './components/routes';
import { registerErrorHandler, registerMiddleware } from './middleware';

/**
 * Init Express REST routes
 *
 * @param {Router} router
 * @returns {void}
 */
export function initRestRoutes(router: Router): void {
	const prefix = '/v1';

	router.get(prefix, (req: Request, res: Response) => res.send('PING'));

	registerMiddleware(router);
	registerApiRoutes(router, prefix);
	registerErrorHandler(router);
}
