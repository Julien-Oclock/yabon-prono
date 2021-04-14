const variationPost = {
    post: (schema) => schema.required()
};

const Joi = require('joi');

const matchSchemas = Joi.object({

    host_team: Joi.string().alter(variationPost),
    visitor: Joi.string().alter(variationPost),
    odds_1 : Joi.number().alter(variationPost),
    odds_2 : Joi.number().alter(variationPost),
    odds_draw : Joi.number().alter(variationPost),
    score_host: Joi.number().integer(),
    score_visitor : Joi.number().integer(),
    winner : Joi.string()
});

const postMatchSchema = matchSchemas.tailor('post');

exports.postMatchSchema = postMatchSchema;
exports.matchSchemas = matchSchemas; 