const db = require('../database');

const Matchs = require('./matchs');

const matchsMapper = {

    // Méthode pour récupérer tous les matchs
    allMatch: async () => {
        //Va chercher tous les matchs
        const result = await db.query(`
        SELECT *
        FROM all_match;
        `);
        // On retourne sous forme d'intance de bets
        return result.rows.map(data => new Matchs(data));
    },

    //va chercher un match via sont id 
    findOne: async (id) => {
        const result = await db.query(`
        SELECT * 
        FROM match
        WHERE match.id = $1;
        `, [id]);

        if (!result.rows[0]) {
            throw new Error ("Pas de match avec l'id " + id);
        }

        return new Matchs(result.rows[0]);
    },

    // delete un match via sont id
    delete: async (id) => {
        console.log(id)
        const result = await matchsMapper.findOne(id);

        if (result) {
            await db.query(`
        DELETE FROM "match" WHERE match.id = $1;
        `, [id]);
        } else {
            throw new Error("Pas de match avec l'id " + id);
            
        };
    }, 

    // Crée un nouveaux match
    save: async (theMatch) => {

        const data = [
            theMatch.host_team,
            theMatch.visitor,
            theMatch.odds_1,
            theMatch.odds_2,
            theMatch.odds_draw,
            theMatch.score_host,
            theMatch.score_visitor,
            theMatch.winner,
        ];

        const query = `
        INSERT INTO match(host_team, visitor, odds_1, odds_2, odds_draw, score_host, score_visitor, winner)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `;

        try {
            await db.query(query, data);
        } catch (err) {
            console.log(err)
        };
    },

    //update un match via sont id
    update: async (newMatch) => {
        try {
            await db.query(`
            UPDATE "match"
            SET host_team = $1,
                visitor = $2,
                odds_1 = $3,
                odds_2 = $4,
                odds_draw = $5,
                score_host = $6,
                score_visitor = $7,
                winner = $8
            WHERE id = $9;
            `, [
            newMatch.host_team, newMatch.visitor, newMatch.odds_1,
            newMatch.odds_2, newMatch.odds_draw, newMatch.score_host,
            newMatch.score_visitor, newMatch.winner,
            newMatch.id
            ]);
        } catch (error) {
            throw new Error(error);
        };
    }, 

    incomingMatch: async () => {

        const result = await db.query(`
            SELECT *
            FROM "match"
            WHERE "match".winner IS NULL;
        `);
        // On retourne sous forme d'intance de bets
        return result.rows.map(data => new Matchs(data));
    }

};

module.exports = matchsMapper;