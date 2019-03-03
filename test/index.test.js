import test from 'ava';
import request from 'supertest';
import app from '../src';


// test("test dat shit", async t => {
// 	let response = await request(app).post('/api/users/register').expect(400)
// 	t.is(response.status, 400)
// })

test('REGISTER: without password', async t => {
	const username = 'some-hase'
	const response = await request(app)
		.post('/api/users/register')
		.send({ username })
	t.plan(2)
	t.is(response.status, 400);
	t.is(response.body.error, `The following keys are required in request body: password`);
})