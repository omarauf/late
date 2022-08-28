import { Router } from 'express';
import { Model, Document } from 'mongoose';
import { AuthService } from '../services/auth';
import { RedisService } from '../services/redis';

export interface IComponentRoutes<T> {
	readonly name: string;
	readonly controller: T;
	readonly router: Router;
	authService: AuthService;

	initRoutes(): void;
	initChildRoutes?(): void;
}

/**
 * Base repository class for connection to MongoDB
 * @type T entity scheme type
 * @type U mongoose document type
 * @type V mongoose model type extends U
 */
export abstract class BaseRepository<T, U extends Document, V extends Model<U>> {
	protected readonly _name: string;
	protected readonly _model: V;

	constructor(model: V, name: string) {
		this._model = model;
		this._name = name;
	}

	/**
	 * Delete cache entries
	 */
	deleteFromCache() {
		RedisService.deleteByKey(this._name);
	}

	/**
	 * get all entities from db
	 * @returns all entities from db
	 */
	getAll(cached?: boolean): Promise<U[]> {
		if (cached) {
			return RedisService.getAndSetObject<U[]>(this._name, () => this.getAll(false));
		}

		return this._model.find({}).exec();
	}

	/**
	 * Create and save a new entity in db
	 * @param entity
	 * @returns Mongoose document
	 */
	async create(entity: T): Promise<U> {
		const created = this._model.create(entity);
		this.deleteFromCache();
		return created;
	}

	/**
	 * Update an entity in db by it's id
	 * @param id
	 * @param entity
	 * @returns updated entity
	 */
	async update(id: string, entity: T): Promise<U | null> {
		const updated = this._model.findByIdAndUpdate(id, entity).exec();
		this.deleteFromCache();
		return updated;
	}

	/**
	 * Delete entity from db
	 * @param id Entity to delete
	 * @returns deleted entity
	 */
	async delete(id: string): Promise<U | null> {
		const deleted = await this._model.findByIdAndDelete(id).exec();
		this.deleteFromCache();
		return deleted;
	}

	/**
	 * Delete all entities from db
	 * @returns
	 */
	deleteAll() {
		this.deleteFromCache();
		return this._model.deleteMany({}).exec();
	}

	/**
	 * find entities by id from db
	 * @param id
	 */
	findById(id: string): Promise<U | null> {
		return this._model.findById(id).exec();
	}
}
