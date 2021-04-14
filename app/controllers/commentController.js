const { request } = require('express');

const commentMapper = require('../models/commentMapper');

const Comment = require('../models/comment');

const commentController = {

    /**
     * Middleware chargé de générer les comment 
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getAllComment: async (req, res) => {

        const comment = await commentMapper.allComment();

        res.json(comment);
    },

    /**
     * Middleware chargé de générer le comment a l'id mentioné dans la query 
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getOneComment: async (req, res) => {

        const { id } = req.params;

        try {
            const comment = await commentMapper.findOne(id);

            res.json(comment);
        } catch (err) {

            res.status(404).json(err.message);
        };
    },

    /**
     * Middleware chargé de save un comment dans la bdd
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    saveComment: async (req, res) => {

        const theComment = new Comment(req.body);

        try {
            await commentMapper.save(theComment);

            res.json(theComment);
        } catch {
            res.status(403).json(err.message);
        };
    },

    /**
     * Middleware chargé de update un comment dans la bdd
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    updateComment: async (req, res) => {

        const { id } = req.params;
        const data = req.body;

        try {

            const comment = await commentMapper.findOne(id);

        if (comment) {
            // je vérifie les champs qui sont renseignés dans le body
            //et je compléte ce qui n'est pas présent 
            for (field in data) {
                if (typeof comment[field] !== 'undefined') {
                    comment[field] = data[field];
                }
            };

                const newComment = new Comment(comment);
                await commentMapper.update(newComment);
                res.json(newComment);
            };
        } catch (err) {
            res.status(404).json(err.message);
        };
    },

    /**
     * Middleware  delete un comment dans la bdd
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    deleteComment: async (req, res) => {

        const { id } = req.params;

        try { 
            const comment = await commentMapper.delete(id);
            res.json("commentaire supprimé");
        } catch (err) {
            res.status(404).json(err.message);
        };

    },



};

module.exports= commentController;