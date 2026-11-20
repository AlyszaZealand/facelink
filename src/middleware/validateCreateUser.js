function validateCreateUser(req, res, next) {
    const name = req.body?.name?.trim();
    const email = req.body?.email?.trim();

    if (!name) {
        return res.status(400).json({
            error: 'Brugernavn er påkrævet'
        });
    }

    if (name.length < 3) {
        return res.status(400).json({
            error: 'Brugernavn skal være mindst 3 tegn'
        });
    }

    if (!email) {
        return res.status(400).json({
            error: 'Email er påkrævet'
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            error: 'Email har ugyldigt format'
        });
    }

    req.body.name = name;
    req.body.email = email;
    next(); // fortsæt til næste middleware eller controller
}

module.exports = validateCreateUser;