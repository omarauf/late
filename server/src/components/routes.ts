import { Router } from 'express';

import { AuthRoutes } from './auth/routes';
import { ProductRoutes } from './product/routes';
import { UserRoutes } from './user/routes';

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerApiRoutes(router: Router, prefix = ''): void {
	router.use(`${prefix}/auth`, new AuthRoutes('cookie').router);
	router.use(`${prefix}/products`, new ProductRoutes().router);
	router.use(`${prefix}/users`, new UserRoutes().router);
}
