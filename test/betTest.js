require('dotenv').config();

const db = require('../app/database');

const { postBetSchema, betSchemas} = require('../app/shemas/bet');

const { expect } = require('chai');

const betMapper = require('../app/models/betsMapper');
const Bet = require('../app/models/bets');

const theIds = {}; 

describe ('Bet model', function() {

    before(function() {

        mockBet = {
            beting_team: "Montpellier",
            bet_odds: 1.5,
            mise: 20,
            trust: 5,
            comment: "Montpellier a manger du lyon a midi",
            match_id: 1,
            user_id: 1,
            bookmaker_id:1
        };
    });

    it('should create an instance of Bet from object litteral', function () {
        const bet = new Bet(mockBet);

        expect(bet).to.have.property('beting_team').to.equal('Montpellier');
    });

    it('should create an instance dof Bet from object litteral with visitor is a number ', function () {

        mockBet.beting_team = 1;

        const validation2 = new Bet(mockBet);

        expect(betSchemas.validate(validation2)).to.have.property('error');
    });
});

describe ('Bets mapper', function() {

    mockBet = {
        beting_team: "Montpellier",
        bet_odds: 1.5,
        mise: 20,
        trust: 5,
        comment: "Montpellier a manger du lyon a midi",
        match_id: 1,
        user_id: 1,
        bookmaker_id:1
    };

    before(async function() {

        {
            const {
                rows
            } = await db.query('INSERT INTO bet(beting_team, bet_odds, mise, trust,comment ,match_id, user_id, bookmaker_id)VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;', ["Montpellier", "1.50", "10", "5","Montpellier on fire","1", "1", "1"]);

            theIds.bet = rows[0].id;
        };
    });

    after(async function() {

        await db.query('DELETE FROM bet WHERE id = $1;', [theIds.bet]);
    });

    describe('#allBets', function () {

        it('should fetch an array of Bets', async function () {
            const theBets = await betMapper.allBet();

            expect(theBets).to.be.a('array');
        });
    });


    describe('#allLastBetsPlayed', function () {

        it('should fetch an array of Bets', async function () {
            const theBets = await betMapper.allLastBetsPlayed();

            expect(theBets).to.be.a('array');
        });
    });

    describe('#lastBetPlayed', function () {

        it('should fetch an array of Bets', async function () {
            const theBets = await betMapper.lastBetPlayed();

            expect(theBets).not.have.property('error');
        });
    });

    describe('#AlllastBetsIncoming', function () {

        it('should fetch an array of Bets', async function () {
            const theBets = await betMapper.allLastBetsIncoming();

            expect(theBets).not.have.property('error');
        });
    });

    describe('#threeLastBetsIncoming', function () {

        it('should fetch an array of Bets', async function () {
            const theBets = await betMapper.threeLastBetsIncoming();

            expect(theBets).not.have.property('error');
        });
    });

    describe('#lastBetincoming', function () {

        it('should fetch an array of Bets', async function () {
            const theBets = await betMapper.lastBetIncoming();

            expect(theBets).not.have.property('error');
        });
    });

    describe('#findOne()', async function () {

        const { rows } = await db.query('INSERT INTO bet(type, cote, mise, beting_team, user_id, bookmaker_id)VALUES($1, $2, $3, $4, $5, $6) RETURNING id;', ["simple", "1.50", "10", "Mock", "1", "1"]);

        theId.bet = rows[0].id;

        it('should fetch an instance of bets', async function () {
            const thebets = await betMapper.findOne(theId.bet);

            expect(thebets).to.be.an.instanceOf(Bet);
        });

        await db.query('DELETE FROM bet WHERE id = $1;', [theId.bet]);

    });

    describe('#lastSimpleBet', function () {

        it('should fetch an array of Bets', async function () {
            const theBets = await betMapper.lastSimpleBet();

            expect(theBets).not.have.property('error');
        });
    });

    describe('#betBest', function () {

        it('should fetch an array of Bets', async function () {
            const theBets = await betMapper.betBest();

            expect(theBets).not.have.property('error');
        });
    });

    describe('#worst', function () {

        it('should fetch an array of Bets', async function () {
            const theBets = await betMapper.worstBet();

            expect(theBets).not.have.property('error');
        });
    });

    describe('#save', function () {

        it('should Post an instance of Bet', async function () {

            const bet = new Bet(await betMapper.save(Bet));

            expect(bet).not.have.property('error');
        });

        it('should save Bet with an betingTeam of type number', async function () {

            mockBet.betSchemas = 1;

            const bet = new Bet(await betMapper.save(Bet));

            expect(betSchemas.validate(bet)).to.have.property('error');
        });
    });

    describe('#update', async function () {

        it('should Upadate ans instance of Bet', async function () {

            const theBet = new Bet(await betMapper.update(mockBet, theIds.id));

            expect(theBet).not.have.property('error');
        });

        it('should Upadate an instance of Bet type of betting_team is number', async function () {

            mockBet.beting_team = 1;
            const theBet = new Bet(await betMapper.update(mockBet, theIds.id));

            expect(betSchemas.validate(theBet)).to.have.property('error');
        });
    });

    describe('#delete', async function () {

        const {
            rows
        } = await db.query('INSERT INTO bet(beting_team, bet_odds, mise, trust,comment ,match_id, user_id, bookmaker_id)VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;', ["Montpellier", "1.50", "10", "5", "Montpellier on fire", "1", "1", "1"]);

        theId.bet = rows[0].id;

        it('should Delete a bet', async function () {

            const validate = await betMapper.delete(theIds.bet);

            expect(validate).to.be.undefined;
        });

        await db.query('DELETE FROM bet WHERE id = $1;', [theId.bet]);
    });
});