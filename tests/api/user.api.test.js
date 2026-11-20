// API test for the GET / endpoint using node:test and supertest
// API-test sender en HTTP anmodning gennem express app.js uden at starte server.js.
// Dette gør det muligt at teste API'et direkte uden at køre en faktisk server.
const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../../src/app');
const User = require('../../src/models/user');

test('GET / returnerer alle brugere', async () => {
    const originalFind = User.find;
    const users = [
        { name: 'Test Bruger', email: 'test@example.com' }
    ];

    User.find = async () => users;

    try {
        const response = await request(app).get('/');

        assert.equal(response.status, 200);
        assert.deepEqual(response.body, users);
    } finally {
        User.find = originalFind;
    }
});