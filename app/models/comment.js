const db = require('../database');

class Comment {

    id;
    content;
    rate;
    user_id;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };
};

module.exports = Comment;