const variationPost = {
    post: (schema) => schema.required()
};

const Joi = require('joi');

const betSchemas = Joi.object({


    beting_team: Joi.string().alter(variationPost),
    bet_odds : Joi.number().alter(variationPost),
    mise : Joi.number().alter(variationPost),
    gain : Joi.number(),
    closure_time : Joi.date(),
    trust : Joi.number().alter(variationPost),
    comment : Joi.string().alter(variationPost),
    match_id : Joi.number().alter(variationPost),
    user_id : Joi.number().alter(variationPost),
    bookmaker_id : Joi.number().alter(variationPost)
});

const postBetSchema = betSchemas.tailor('post');


exports.postBetSchema = postBetSchema;
exports.betSchemas = betSchemas;