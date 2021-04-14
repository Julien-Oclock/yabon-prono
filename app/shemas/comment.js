const variatontPost = {
    post: (schema) => schema.required()
};

const Joi = require('joi');

const commentSchema = Joi.object({
    content: Joi.string().alter(variatontPost),
    rate: Joi.number().alter(variatontPost),
    user_id: Joi.number().alter(variatontPost),
});

const postCommentSchema = commentSchema.tailor('post');

exports.commentSchema = commentSchema;
exports.postCommentSchema = postCommentSchema;
