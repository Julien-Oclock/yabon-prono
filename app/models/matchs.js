const db = require('../database'); 

class Matchs {

    id;
    host_team;
    visitor;
    odds_1;
    odds_2;
    odds_draw;
    score_host;
    score_visitor;
    winner;


    constructor(data) {
        for (const prop in data){
            this[prop] = data[prop];
        }
    };
};

module.exports = Matchs;