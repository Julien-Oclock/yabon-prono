const {
    expect
} = require('chai');

const {
    postBetSchema,
    betSchemas
} = require('../app/shemas/bet');

let mockBets;

describe('Post bet schema', function () {

    before(function () {

        // L'objet à valider
        mockBets = {
            beting_team: "montpellier",
            bet_odds: 1.5,
            mise: 20,
            trust: 5,
            comment: "Montpellier a manger du lyon a midi",
            match_id: 1,
            user_id: 1,
            bookmaker_id:1
        };
    });

    it('should validate a valid Bet', function () {

        expect(postBetSchema.validate(mockBets)).not.to.have.property('error');
    });

    it('should not validate a Bet with an cote of type string ', function () {

        mockBets.cote = "un soixante";

        const validation2 = postBetSchema.validate(mockBets);

        expect(validation2).to.have.property('error');

        expect(validation2.error.details[0].path[0]).to.equal('cote');
    });
});

describe('Patch bet schema', function () {

    before(function () {

        mockBets = {
            beting_team: "saint christol",
        };
    });

    it('should validate a valid bet', function () {

        expect(betSchemas.validate(mockBets)).not.to.have.property('error');
    });

    it('should not validate a bet with an cote of type string ', function () {

        mockBets.cote = "un soixante";

        const validation2 = betSchemas.validate(mockBets);

        expect(validation2).to.have.property('error');

        expect(validation2.error.details[0].path[0]).to.equal('cote');
    });

});