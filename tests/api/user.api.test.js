// API test for the GET /users endpoint using node:test and supertest
// API-test sender en HTTP anmodning gennem express app.js uden at starte server.js.
// Dette gør det muligt at teste API'et direkte uden at køre en faktisk server.
const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../../src/app');
const User = require('../../src/models/userModel');

test('GET /users returnerer alle brugere', async () => {
    const originalFind = User.find;
    const users = [
        { name: 'Test Bruger', email: 'test@example.com' }
    ];

    User.find = async () => users;

    try {
        const response = await request(app).get('/users');

        assert.equal(response.status, 200);
        assert.deepEqual(response.body, users);
    } finally {
        User.find = originalFind;
    }
});

test('POST /users opretter en bruger', async () => {
    const originalFindOne = User.findOne;
    const originalSave = User.prototype.save;

    User.findOne = async () => null;
    User.prototype.save = async function () {
        return this;
    };

    try {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com'
            });

        assert.equal(response.status, 201);
        assert.equal(response.body.name, 'John Doe');
        assert.equal(response.body.email, 'john.doe@example.com');
        assert.deepEqual(response.body.posts, []);
        assert.ok(response.body._id);
    } finally {
        User.findOne = originalFindOne;
        User.prototype.save = originalSave;
    }
});