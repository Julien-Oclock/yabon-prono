require('dotenv').config();

const db = require('../app/database');

const { postMatchSchema, matchSchemas } = require('../app/shemas/match');

const { expect } = require('chai');

const matchMapper = require('../app/models/matchsMapper');
const Match = require('../app/models/matchs');

const theIds = {}; 

describe ('Match model', function() {

    before(function() {

        mockMatch = {
            host_team: "Montpellier",
            visitor: "Nimes",
            odds_1: 1.2,
            odds_2: 2.2,
            odds_draw: 1.7,
            score_host: 2,
            score_visitor: 1,
            winner: "Montpellier"
        };
    });

    it ('should create an instance of Match from object litteral', function() {
        const theMatch = new Match(mockMatch);

        expect(theMatch).to.have.property('visitor').to.equal('Nimes');
    });

    it ('should create an instance dof Match from object litteral with visitor is a number ', function() {

        mockMatch.visitor = 1;

        const validation2 = new Match(mockMatch);

        expect(matchSchemas.validate(validation2)).to.have.property('error');
    });
});

describe ('Match Mapper', function() {

    mockMatch = {
        host_team: "Montpellier",
        visitor: "Nimes",
        odds_1: 1.2,
        odds_2: 2.2,
        odds_draw: 1.7,
        score_host: 2,
        score_visitor: 1,
        winner: "Montpellier"
    };

    before(async function() {

        {

            const { rows } = await db.query('INSERT INTO match(host_team, visitor, odds_1, odds_2, odds_draw, score_host, score_visitor, winner) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id ;', ['mock ', 'chai ', '1.2', '2.2 ','1.70 ','2 ','1 ', 'mock']);

            theIds.match = rows[0].id;
        };
    });

    after(async function() {

        await db.query('DELETE FROM match WHERE id = $1', [theIds.match]);
    });

    describe('#allMatchs', function () {

        it('should fetch an array of Match', async function () {
            const theMatch = await matchMapper.allMatch();

            expect(theMatch).to.be.a('array');
        });
    });

    describe('#findOne()', function () {

        it('should fetch an instance of Match', async function () {
            const theMatch = await matchMapper.findOne(theIds.match);

            expect(theMatch).to.be.an.instanceOf(Match);
        });
    });

    describe('#save', function () {

        it('should Post an instance of Match', async function () {

            const theMatch = new Match(await matchMapper.save(mockMatch));

            expect(theMatch).not.have.property('error');
        });

        it('should save Match with an visitor of type number', async function () {

            mockMatch.visitor = 1;

            const theMatch = new Match(await matchMapper.save(mockMatch));

            expect(postMatchSchema.validate(theMatch)).to.have.property('error');
        });
    });

    describe('#update', async function () {

        it('should Update an instance of Match ', async function () {

            const theMatch = new Match(await matchMapper.update(mockMatch, theIds.id));

            expect(theMatch).not.have.property('error');
        });

        it('should Update an instance of match with type of visitor is a number ', async function () {


            mockMatch.visitor = 1;

            const theMatch = new Match(await matchMapper.update(mockMatch, theIds.id));

            expect(matchSchemas.validate(theMatch)).to.have.property('error');
        });
    });

    describe('#delete', async function () {

        it('should Delete a Match', async function () {

            const validate = await matchMapper.delete(theIds.match);

            expect(validate).to.be.undefined;
        });
    });
});