// Modeltest som tester om mongoose-modellen kan validere et brugerdokument korrekt.
const test = require('node:test');
const assert = require('node:assert/strict');
const User = require('../../src/models/userModel');

// Test for User model validation
test('Kan jeg oprette en bruger med gyldigt navn og email?', async () => {
    const user = new User({
        name: 'Test Bruger',
        email: 'test@example.com'
    });

    await assert.doesNotReject(() => user.validate());

    assert.equal(user.get('name'), 'Test Bruger');
    assert.equal(user.get('email'), 'test@example.com');
});

test('Bliver en bruger uden email afvist?', async () => {
    const user = new User({
        name: 'Test Bruger'
        // email is missing
    });

    // Validate the user and expect a validation error for the email field
    await assert.rejects(() => user.validate(), (error) => {
        assert.equal(error.errors.email.message, 'Email is required'); // error.errors.email.message er standard Mongoose-strukturen...
        return true;
    });
});

test('Kan jeg oprette to brugere med samme email?', async () => {
    const user1 = new User({
        name: 'Test Bruger 1',
        email: 'test@example.com'
    });

    const user2 = new User({
        name: 'Test Bruger 2',
        email: 'test@example.com'
    });

    // Validate both users and expect no validation errors
    await assert.doesNotReject(() => user1.validate());
    await assert.doesNotReject(() => user2.validate());
});
