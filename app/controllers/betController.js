const { request } = require('express');

const betsMapper = require('../models/betsMapper'); 

const Bets = require('../models/bets');


const betsController = {

    /**
     * Middleware chargé de générer les bets 
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getAllBets: async (req, res) => {
        const bets = await betsMapper.allBet();

        res.json(bets);
    },
    
    /**
     * Middleware chargé de générer les dernier bets terminer
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getAllLastBetsPlayed: async (req, res) => {

        const allLastBetsPlayed = await betsMapper.allLastBetsPlayed();

        res.json(allLastBetsPlayed);
    },

    /**
     * Middleware chargé de générer le dernier bet terminer  
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getLastBetPlayed: async (req, res) => {

        const lastBetPlayed = await betsMapper.lastBetPlayed();

        res.json(lastBetPlayed);
    },

    /**
     * Middleware chargé de générer les dernier bets a venir  
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getAllLastBetsIncoming: async (req, res) => {

        const allLastBetsIncoming = await betsMapper.allLastBetsIncoming();

        res.json(allLastBetsIncoming);
    },

    /**
     * Middleware chargé de générer le dernier bet a venir  
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getLastBetIncoming: async (req, res) => {

        const lastBetIncoming = await betsMapper.lastBetIncoming();

        res.json(lastBetIncoming);
    },

    /**
     * Middleware chargé de générer le bet à l'id mentionné dans la query string
     * L'utilisateur doit fournir l'id dans la query string
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getOneBet: async (req, res) => {
        const { id } = req.params;

        try {
            const bet = await betsMapper.findOne(id);

            res.json(bet);
        } catch (err) {

            res.status(404).json(err.message);
        };
    },

    /**
     * Middleware chargé de générer le bet avec le meilleur gain  
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getBestBet: async (req, res) => {

        const betBest = await betsMapper.betBest();

        res.json(betBest);
    },

    /**
     * Middleware chargé de générer le bet avec le plus mauvais gain  
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    getWorstBet: async (req, res) => {

        const badestBet = await betsMapper.worstBet();

        res.json(badestBet);
    },

    /**
     * Middleware chargé d'ajouté des bets  
     * Retourne le bet crée 
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    saveBet: async (req, res) => {

        const theBet = new Bets(req.body);

        try {
            await betsMapper.save(theBet);


            res.json(theBet);
        } catch {
            res.status(403).json(err.message)
        };
    },

    /**
     * Middleware chargé de suprimé le bet avec l'id spécifier dans la query string 
     * L'utilisateur doit fournir l'id dans la query string
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    deleteBet: async (req, res) => {

        const { id } = req.params;

        try {

            const bet = await betsMapper.delete(id);
            res.json(bet);
            
        } catch (err) {

            res.status(404).json(err.message);
        };

    }, 

    /**
     * Middleware chargé de modifié des bets  
     * Retourne le bet modifié
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    updateBet: async (req, res) => {

        const { id } = req.params;
        const data = req.body;

        try {

        const bet = await betsMapper.findOne(id);

        if (bet) {
            // je vérifie les champs qui sont renseignés dans le body
            //et je compléte ce qui n'est pas présent 
            for ( field in data){
                if (typeof bet[field] !== 'undefined'){
                    bet[field] = data[field];
                }
            };

            const newBet = new Bets(bet);
            await betsMapper.update(newBet);
            res.json(newBet);
        };
        } catch (err){
            res.status(404).json(err.message);
        };

    },

    /**
     * Middleware chargé de générer les 3 futur bets  
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */
    threeLastBetsIncoming: async (req, res) => {

        const threeLastBetsIncoming = await betsMapper.threeLastBetsIncoming();

        res.json(threeLastBetsIncoming);
    }
};

module.exports = betsController;