const variatontPost = {
    post: (schema) => schema.required()
};

const Joi = require('joi');

const bookmakerSchemas = Joi.object({

    brand: Joi.string().alter(variatontPost),
    slug: Joi.string().alter(variatontPost)
});

const postBookmakerSchemas = bookmakerSchemas;

exports.postBookmakerSchemas = postBookmakerSchemas;
exports.bookmakerSchemas = bookmakerSchemas;