const { expect } = require('chai');

const { postMatchSchema, matchSchemas } = require('../app/shemas/match');

let mockMatch;

describe('Post match schema', function() {

    before(function() {

        mockMatch = {
            host_team: "Montpellier",
            visitor: "Nimes",
            odds_1: 1.2,
            odds_2: 2.2,
            odds_draw: 1.7 ,
            score_host: 2,
            score_visitor: 1,
            winner:"Montpellier"
        };
    });

    it ('should validate a valide Match ', function() {

        expect(postMatchSchema.validate(mockMatch)).not.to.have.property('error');
    });

    it ('should not validate a match with an host_team of type number', function() {

        mockMatch.host_team = 2;

        const validation2 = postMatchSchema.validate(mockMatch);

        expect(validation2).to.have.property('error');

        expect(validation2.error.details[0].path[0]).to.equal('host_team');
    });
});

describe('Patch match schema', function() {

    before(function() {

        mockMatch = {
            visitor: "null team"
        };
    });

    it ('should validate a valid match', function() {

        expect(matchSchemas.validate(mockMatch)).not.to.have.property('error');
    });

    it ('should not validate a match with an visitor of type is number', function() {

        mockMatch.visitor = 1;

        const validation2 = matchSchemas.validate(mockMatch);

        expect(validation2).to.have.property('error');

        expect(validation2.error.details[0].path[0]).to.equal('visitor');
    });
});