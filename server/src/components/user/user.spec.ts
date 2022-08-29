import { TestFactory } from '../../test/setup';

interface IUser {
	firstName: string;
	lastName: string;
	company: string;
	phone: string;
	email: string;
	password: string;
	isAdmin: boolean;
	id?: string;
}

describe('Testing user component', () => {
	const factory: TestFactory = new TestFactory();

	let accessToken = '';
	let testUser: IUser;

	beforeAll(async () => {
		await factory.init();
		await factory.register();
		const data = await factory.signin(); // with admin user
		accessToken = data.accessToken;
		// const signedUser = data.user;
	});

	afterAll(async () => {
		return factory.close();
	});

	describe('POST /users', () => {
		it('responds with status 401', (done) => {
			factory.app
				.post('/api/v1/users')
				.send()
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(401, done);
		});

		it('responds with new user', (done) => {
			factory.app
				.post('/api/v1/users')
				.send({
					firstName: 'omar',
					lastName: 'auf',
					company: 'Fuck',
					phone: '0 531 501 36 73',
					email: 'omar@gmail.com',
					password: '123456',
					isAdmin: false
				})
				.set('Authorization', `Bearer  ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;
						testUser = res.body;
						return done();
					} catch (err) {
						return done(err);
					}
				});
		});

		it('responds with 403 not admin', async () => {
			const nonAdminUserToken = await factory.signin(testUser);
			factory.app
				.post('/api/v1/users')
				.send({
					firstName: 'omar',
					lastName: 'auf',
					company: 'Fuck',
					phone: '0 531 501 36 73',
					email: 'omar@gmail.com',
					password: '123456',
					isAdmin: false
				})
				.set('Authorization', `Bearer  ${nonAdminUserToken.accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(403)
				.end((err, res) => {
					try {
						if (err) throw err;
						testUser = res.body;
						return testUser;
					} catch (err) {
						return err;
					}
				});
		});
	});

	describe('PUT /users/', () => {
		it('responds with updated user', (done) => {
			factory.app
				.put(`/api/v1/users/${testUser.id}`)
				.send({
					...testUser,
					firstName: 'ahmed',
					lastName: 'khalid',
					company: "i don't know",
					phone: '0 531 501 36 XX',
					email: 'ahmed@gmail.com'
				})
				.set('Authorization', `Bearer  ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end((err, res) => {
					try {
						if (err) throw err;

						const user: IUser = res.body;

						expect(user.firstName).toEqual('ahmed');
						expect(user.lastName).toEqual('khalid');
						expect(user.company).toEqual("i don't know");
						expect(user.phone).toEqual('0 531 501 36 XX');
						expect(user.email).toEqual('omar@gmail.com');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});

	describe('GET /users', () => {
		it('responds with user array', (done) => {
			factory.app
				.get('/api/v1/users')
				.set('Authorization', `Bearer  ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const users: IUser[] = res.body;

						const ourTestUser = users.find((user) => user.id === testUser.id);

						if (!ourTestUser) throw new Error('User not found');

						expect(ourTestUser.firstName).toEqual('ahmed');
						expect(ourTestUser.lastName).toEqual('khalid');
						expect(ourTestUser.company).toEqual("i don't know");
						expect(ourTestUser.phone).toEqual('0 531 501 36 XX');
						expect(ourTestUser.email).toEqual('omar@gmail.com');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});

	describe('GET /users/', () => {
		it('responds with single user', (done) => {
			factory.app
				.get(`/api/v1/users/${testUser.id}`)
				.set('Authorization', `Bearer  ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const user: IUser = res.body;

						expect(user.firstName).toEqual('ahmed');
						expect(user.lastName).toEqual('khalid');
						expect(user.company).toEqual("i don't know");
						expect(user.phone).toEqual('0 531 501 36 XX');
						expect(user.email).toEqual('omar@gmail.com');

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});

	describe('DELETE /users/1', () => {
		it('responds with status 204', (done) => {
			factory.app
				.delete(`/api/v1/users/${testUser.id}`)
				.set('Authorization', `Bearer  ${accessToken}`)
				.set('Accept', 'application/json')
				.expect(204, done);
		});

		it('responds with status 404', (done) => {
			factory.app
				.delete(`/api/v1/users/${testUser.id}`)
				.set('Authorization', `Bearer  ${accessToken}`)
				.set('Accept', 'application/json')
				.expect(404, done);
		});
	});
});
