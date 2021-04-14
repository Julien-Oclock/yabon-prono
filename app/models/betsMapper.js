const Bets = require('./bets'); 

const db = require('../database');

const betsMapper = {

    // Méthode pour récupérer tous les bets
    allBet: async () => {
        //Va chercher tous les bets
        const result = await db.query(`
        SELECT *
        FROM all_bet ORDER BY closure_time;
        `);
        // On retourne sous forme d'intance de bets
        return result.rows.map(data => new Bets(data));
    },

    allLastBetsPlayed: async () => {

        const result = await db.query(`
        SELECT *
        FROM bet_with_gain ORDER BY closure_time;
        `);

        return result.rows.map(data => new Bets(data));
    },

    lastBetPlayed: async () => {

        const result = await db.query(`
        SELECT *
        FROM last_bet_resolved
        `);

        return result.rows.map(data => new Bets(data));
    },

    allLastBetsIncoming: async () => {

        const result = await db.query(`
        SELECT * 
        FROM last_bet_incoming;
        `)

        return result.rows.map(data => new Bets(data));
    },

    lastBetIncoming: async () => {

        const result = await db.query(`
        SELECT *
        FROM last_bet;
        `);

        return result.rows.map(data => new Bets(data));
    },

    findOne: async (id) => {
        //Va chercher un bet précis (id) dans la table bet
        const result = await db.query(`
        SELECT *
        FROM bet
        JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
        JOIN "match"
        ON "match".id = bet.match_id
        WHERE bet.id = $1;
        `,[id]);

        if (!result.rows[0]) {
            throw new Error ("Pas de bet avec l'id " + id);
        }

        return new Bets(result.rows[0]);
    },


    lastSimpleBet: async () => {

        const result = await db.query(`
            SELECT *
            FROM last_bet;
        `);

        return result.rows.map(data => new Bets(data));
    },

    betBest: async () => {

        const result = await db.query(`
        SELECT * FROM best_bet;
        `);

        return result.rows.map(data => new Bets(data));
    },

    worstBet: async () => {

        const result = await db.query(`
        SELECT * FROM worst_bet;
        `);

        return result.rows.map(data => new Bets(data));
    },

    save: async (theBet) => {

        const data = [
            theBet.beting_team,
            theBet.bet_odds,
            theBet.mise,
            theBet.trust,
            theBet.comment,
            theBet.match_id,
            theBet.user_id,
            theBet.bookmaker_id

        ]; 

        const query = `
        INSERT INTO bet(beting_team, bet_odds, mise, trust, comment, match_id, user_id, bookmaker_id)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `;

        try {
            await db.query(query, data);
        } catch (err) {
            console.log(err)
        };
    },

    delete: async (id) => {

        const result = await betsMapper.findOne(id);
        
        if (result) {
            await db.query(`
            DELETE FROM "bet" WHERE bet.id = $1;
            `, [id]);
        } else {
            throw new Error("Pas de bet avec l'id " + id);
        };
    },

    update: async(newBet) => {
        try {
            await db.query(`
            UPDATE bet
            SET beting_team = $1,
                bet_odds = $2,
                mise = $3,
                trust = $4,
                comment = $5,
                match_id = $6,
                user_id = $7,
                bookmaker_id = $8,
                gain = $9
            WHERE id = $10;
            `,[newBet.beting_team ,newBet.bet_odds, newBet.mise, newBet.trust, newBet.comment, newBet.match_id, newBet.user_id, newBet.bookmaker_id, newBet.gain, newBet.id]);
        } catch (error) {
            throw new Error(error);
        };
    },

    threeLastBetsIncoming: async () => {

        try {

            const result = await db.query(`
            SELECT * 
            FROM three_last_bet_incoming;`);

            return result.rows.map(data => new Bets(data));
        } catch (err) {
            throw new Error(error);
        }
    }
}; 

module.exports = betsMapper; 