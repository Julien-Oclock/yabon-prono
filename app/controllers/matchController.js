const { request } = require('express');
const Matchs = require('../models/matchs');
const matchsMapper = require('../models/matchsMapper'); 

const matchsController = {

    /**
     * Middleware chargé de générer les matchs 
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getAllMatchs: async (req, res) => {
        const matchs = await matchsMapper.allMatch();

        res.json(matchs);
    },

    /**
     * Middleware chargé de générer le match à l'id mentionné dans la query string
     * L'utilisateur doit fournir l'id dans la query string
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getOneMatch: async (req, res) => {
        const { id } = req.params;

        try {
            const match = await matchsMapper.findOne(id);

            res.json(match);
        } catch (err) {

            res.status(404).json(err.message);
        }
    },

    /**
     * Middleware chargé d'ajouté des match  
     * Retourne le match crée 
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    saveMatch: async (req, res) => {

        const theMatch = new Matchs(req.body);

        try {
            await matchsMapper.save(theMatch);


            res.json(theMatch);
        } catch {
            res.status(403).json(err.message)
        };
    },
    
    /**
     * Middleware chargé de suprimé le match avec l'id spécifier dans la query string 
     * L'utilisateur doit fournir l'id dans la query string
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    deleteMatch: async (req, res) => {

        const { id } = req.params;

        try {
            const match = await matchsMapper.delete(id);

            res.json(match);
        } catch (err) {
            res.status(404).json(err.message);
        };
    },

    /**
     * Middleware chargé de modifié les match  
     * L'utilisateur doit fournir l'id dans la query string
     * Retourne le match modifié  
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    updateMatch: async (req, res) => {

        const { id } = req.params;
        const data = req.body;

        try {

            const match = await matchsMapper.findOne(id);

            if (match) {
                // je vérifie les champs qui sont renseignés dans le body
                //et je compléte ce qui n'est pas présent 
                for (field in data) {
                    if (typeof match[field] !== 'undefined') {
                        match[field] = data[field];
                    }
                };

                const newMatch = new Matchs(match);
                await matchsMapper.update(newMatch);
                res.json(newMatch);
            };
        } catch (err) {
            res.status(404).json(err.message);
        };

    },

    /**
     * Middleware chargé de générer les matchs non résolue 
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    incomingMatch: async (req, res) => {

        const match = await matchsMapper.incomingMatch();

        res.json(match);
    },


    addApiMatch : (req, res) => {

        
    }

    
};

module.exports = matchsController; 