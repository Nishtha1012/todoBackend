const joi = require('joi')

//joi schema for nvalidating signup form data
module.exports.validateData = (email, password, firstname, lastname, username, dob, gender) => {
    const schema = joi.object({
        firstname: joi.string()
            .regex(/^[A-Za-z]+$/)
            .required()
            .messages({
                'string.base': `firstname should be a type of 'text'`,
                'string.empty': `firstname cannot be an empty field`,
                'string.pattern.base': `firstname should be valid.`,
                'any.required': `firstname is required!!`
            }),
        lastname: joi.string()
            .regex(/^[A-Za-z]+$/)
            .required()
            .messages({
                'string.base': `last name should be a type of 'text'`,
                'string.empty': `last name cannot be an empty field`,
                'string.pattern.base': `last name should be valid.`,
                'any.required': `last name is required!!`
            }),
        username: joi.string()
            .required()
            .messages({
                'any.required': `username is required!!`
            }),
        email: joi.string()
            .regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            .required()
            .email()
            .messages({
                'string.base': `email should be a type of 'text'`,
                'string.empty': `email cannot be an empty field`,
                'string.pattern.base': `email should be a valid email address.`,
                'any.required': `email is required!!`
            }),
        password: joi.string().min(3)
            .required()
            .messages({
                'string.empty': `password cannot be an empty field`,
                'string.min': `password should have a minimum length of {#limit}`,
                'any.required': `password is required!!`
            }),
        dob: joi.string().required()
            .messages({
                'any.required': `date of birth is required!!`
            }),
        gender: joi.string().required()
            .messages({
                'any.required': `gender is required!!`
            })
    })

    const { error, value } = schema.validate({ email, password, firstname, lastname, username, dob, gender })

    if (error) {
        console.log(error);
        console.log(error.details[0].message);
        return (error.details.map(detail => detail.message));
    }
    else {
        return true
    }
}


//joi schema for validating lodin form data
module.exports.validateLoginData = (email, password) => {
    const schema = joi.object({
        email: joi.string()
            .regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            .required()
            .email()
            .messages({
                'string.base': `email should be a type of 'text'`,
                'string.empty': `email cannot be an empty field`,
                'string.pattern.base': `email should be a valid email address.`,
                'any.required': `email is required!!`
            }),
        password: joi.string().min(3)
            .required()
            .messages({
                'string.empty': `password cannot be an empty field`,
                'string.min': `password should have a minimum length of {#limit}`,
                'any.required': `password is required!!`
            })
    })

    const { error, value } = schema.validate({ email, password })

    if (error) {
        console.log(error.details[0].message);
        return (error.details.map(detail => detail.message));
    }
    else {
        return true
    }
}