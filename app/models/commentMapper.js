const Comment = require('./comment');

const db = require('../database');

const commentMapper = {

    allComment: async () => {

        const result = await db.query(`
        SELECT * 
        FROM all_comment LIMIT 6;
        `);

        return result.rows.map(data => new Comment(data));
    },

    findOne: async (id) => {

        const result = await db.query(`
        SELECT * 
        FROM comment
        WHERE comment.id = $1;
        `,[id]);

        if (!result.rows[0]){
            throw new Error ("Voila voila pas de comment a l'id " + id);
        }

        return new Comment(result.rows[0]);
    },

    save: async (theComment) => {

        data = [
            theComment.content,
            theComment.rate,
            theComment.user_id
        ];

        const query = `
        INSERT INTO comment (content, rate, user_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        try { 
            await db.query(query, data)
        } catch (err) {
            console.log(err);
        };
    },

    update: async (newComment) => {

        try {
            await db.query(`
            UPDATE comment
                SET content = $1,
                    rate = $2,
                    user_id = $3
                WHERE id = $4;
            `, [newComment.content, newComment.rate, newComment.user_id, newComment.id]);

        } catch (error) {
            throw new Error(error);
        };
    },

    delete: async (id) => {

        const result = await commentMapper.findOne(id);

        if (result) {

            await db.query(`
            DELETE FROM comment WHERE comment.id = $1;
            `, [id]);
        } else {
            throw new Error("Pas de comment avec l'id " + id + "voila voila");
        };
    },

};

module.exports = commentMapper;