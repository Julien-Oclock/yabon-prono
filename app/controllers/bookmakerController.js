const { request } = require('express');

const bookmakersMapper = require('../models/bookmakersMapper');

const Bookmakers = require('../models/bookmakers');

const bookmakersController = {

    /**
     * Middleware chargé de générer les bookmakers 
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getAllBookmakers: async (req, res) => {
        const bookmakers = await bookmakersMapper.allBookmakers();

        res.json(bookmakers);
    },

    /**
     * Middleware chargé de générer le bookmaker à l'id mentionné dans la query string
     * L'utilisateur doit fournir l'id dans la query string
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getOneBookmaker: async (req, res) => {
        const { id } = req.params;

        try {
            const bookmaker = await bookmakersMapper.findOne(id);

            res.json(bookmaker);
        } catch (err) {

            res.status(404).json(err.message);
        }
    },


    /**
     * Middleware chargé d'ajouté des bookmakers  
     * Retourne le bookmaker crée 
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    saveBookmaker: async (req, res) => {

        const theBookmaker = new Bookmakers(req.body);

        try {
            await bookmakersMapper.save(theBookmaker);


            res.json(theBookmaker);
        } catch {
            res.status(403).json(err.message)
        };
    },

    /**
     * Middleware chargé de modifié les bookmakers  
     * L'utilisateur doit fournir l'id dans la query string
     * Retourne le bookmaker modifié  
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    updateBookmaker: async (req, res) => {

        const { id } = req.params;
        const data = req.body;

        try {

            const bookmaker = await bookmakersMapper.findOne(id);

            if (bookmaker) {
                // je vérifie les champs qui sont renseignés dans le body
                //et je compléte ce qui n'est pas présent 
                for (field in data) {
                    if (typeof bookmaker[field] !== 'undefined') {
                        bookmaker[field] = data[field];
                    }
                };

                const newBookmaker = new Bookmakers(bookmaker);
                await bookmakersMapper.update(newBookmaker);
                res.json(newBookmaker);
            };
        } catch (err) {
            res.status(404).json(err.message);
        };

    },

    /**
     * Middleware chargé de suprimé le bookmaker avec l'id spécifier dans la query string 
     * L'utilisateur doit fournir l'id dans la query string
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    deleteBookmaker: async (req, res) => {

        const { id } = req.params;

        try {
            const bookmaker = await bookmakersMapper.delete(id);
            res.json(bookmaker);

        } catch (err) {

            res.status(404).json(err.message);
        };
    },
};

module.exports = bookmakersController;