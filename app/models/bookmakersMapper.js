const Bookmakers = require('./bookmakers');

const db = require('../database');

const bookmakersMapper = {

    // Récupére tous les bookmakers
    allBookmakers: async () => {
        //Va chercher tous les bookmakers
        const result = await db.query(`
        SELECT *
        FROM bookmaker;
        `);
        // On retourne sous forme d'intance de bookmakers
        return result.rows.map(data => new Bookmakers(data));
    },

    // Récupere un bookmaker via sont id
    findOne: async (id) => {
        //Va chercher un bookmaker précis (id) dans la table bookmaker
        const result = await db.query(`
        SELECT *
        FROM bookmaker
        WHERE bookmaker.id = $1;
        `, [id]);

        if (!result.rows[0]) {
            throw new Error("Pas de bookmaker avec l'id " + id);
        }

        return new Bookmakers(result.rows[0]);
    },

    // Ajoute un bookmaker
    save: async (theBookmaker) => {

        const data = [
            theBookmaker.brand,
            theBookmaker.slug
        ];

        const query = `
        INSERT INTO bookmaker (brand, slug)
        VALUES($1, $2)
        RETURNING *;
        `;

        try {
            await db.query(query, data);
        } catch (err) {
            console.log(err)
        };
    },

    // Modifie un bookmaker
    update: async (newBookmaker) => {
        try {
            await db.query(`
            UPDATE bookmaker
            SET brand = $1,
                slug = $2
            WHERE id = $3;
            `, [newBookmaker.brand, newBookmaker.slug, newBookmaker.id, ]);
        } catch (error) {
            throw new Error(error);
        };
    },

    delete: async (id) => {

        const result = await bookmakersMapper.findOne(id);

        if (result) {
            await db.query(`
            DELETE FROM "bookmaker" WHERE bookmaker.id = $1;
            `, [id]);
        } else {
            throw new Error ("Pas de bookmaker avec l'id " + id);
        };
    }
};

module.exports = bookmakersMapper;