const joi = require('joi');

const userValidationSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
})

exports.validateUser = (req, res, next) => {
    const {error} = userValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    next();
}