const test = require('node:test');
const assert = require('node:assert/strict');
const User = require('../src/models/user');

// Test for User model validation
test('Kan jeg oprette en bruger med gyldigt navn og email?', async () => {
    const user = new User({
        name: 'Test Bruger',
        email: 'test@example.com'
    });

    await assert.doesNotReject(() => user.validate());

    assert.equal(user.name, 'Test Bruger');
    assert.equal(user.email, 'test@example.com');
});