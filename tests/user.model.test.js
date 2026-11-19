const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const User = require('../src/models/user');

beforeAll(async () => {
    process.env.MONGODB = 'mongodb://127.0.0.1:27017/userdb';
    await connectDB();
});

afterAll(async () => {
    await User.deleteMany({ email: /^test-/ });
    await mongoose.disconnect();
});

test('required skal afvise en bruger uden name', async () => {
    const user = new User({ email: 'test-name@example.com' });

    await expect(user.validate()).rejects.toThrow();
});

test('gemmer og henter en bruger', async () => {
    const created = await User.create({
        name: 'Test Bruger',
        email: `test-${Date.now()}@example.com`
    });

    const found = await User.findById(created._id);

    expect(found.name).toBe('Test Bruger');

    await found.deleteOne();
});