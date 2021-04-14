const variatontPost = {
    post: (schema) => schema.required()
};

const Joi = require('joi');

const userSchema = Joi.object({
    lastname: Joi.string().alter(variatontPost),
    firstname: Joi.string().alter(variatontPost),
    mail: Joi.string().alter(variatontPost),
    password: Joi.string().alter(variatontPost),
    role : Joi.string()
});

const postUserSchema = userSchema.tailor('post');

exports.userSchema = userSchema;
exports.postUserSchema = postUserSchema;
