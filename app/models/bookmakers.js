const db = require('../database');

class Bookmakers {

    id;
    brand;
    slug;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };
};

module.exports = Bookmakers;