const db = require('../database');

class Bets {

    id;
    create_at;
    beting_team;
    bet_odds;
    mise;
    gain;
    closure_time;
    trust;
    comment;
    math_id;
    user_id;
    bookmaker_id;



    constructor(data) {
        for (const prop in data){
            this[prop] = data[prop];
        };
    };
};

module.exports = Bets; 