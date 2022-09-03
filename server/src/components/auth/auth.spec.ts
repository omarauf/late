import { TestFactory } from '../../test/setup';

import { User } from '../user/model';

describe('Testing auth component', () => {
	const factory: TestFactory = new TestFactory();

	const testUser = new User({
		firstName: 'omar',
		lastName: 'auf',
		company: 'Fuck',
		phone: '0 531 501 36 73',
		email: 'omar@gmail.com',
		password: '123456',
		isAdmin: true
	});

	beforeAll((done) => {
		factory.init().then(done);
	});

	afterAll((done) => {
		factory.close().then(done);
	});

	describe('POST /auth/register', () => {
		it('responds with status 200', (done) => {
			factory.app
				.post('/v1/auth/register')
				.send({
					email: testUser.email,
					firstName: testUser.firstName,
					lastName: testUser.lastName,
					password: testUser.password,
					phone: testUser.phone,
					company: testUser.company,
					isAdmin: testUser.isAdmin
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, done);
		});

		it('register second user with same email', (done) => {
			factory.app
				.post('/v1/auth/register')
				.send({
					email: testUser.email,
					firstName: testUser.firstName,
					lastName: testUser.lastName,
					password: testUser.password,
					phone: testUser.phone,
					company: testUser.company,
					isAdmin: testUser.isAdmin
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(400, done);
		});
	});

	describe('POST /auth/signin', () => {
		it('responds with status 400', (done) => {
			factory.app
				.post('/v1/auth/signin')
				.send()
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(400, done);
		});

		it('responds with status 401', (done) => {
			factory.app
				.post('/v1/auth/signin')
				.send({
					email: testUser.email,
					password: 'wrongPassword'
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(401, done);
		});

		it('responds with signed in user and token', (done) => {
			factory.app
				.post('/v1/auth/signin')
				.send({
					email: testUser.email,
					password: testUser.password
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					try {
						if (err) throw err;

						const { accessToken, user } = res.body;

						expect(typeof accessToken).toBe('string');

						expect(user.email).toEqual(testUser.email);
						expect(user.firstName).toEqual(testUser.firstName);

						return done();
					} catch (err) {
						return done(err);
					}
				});
		});
	});
});
