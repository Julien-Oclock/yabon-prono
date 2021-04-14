const db = require('../database');
const Bet = require('../models/bets')




const resolveBetMapper = {

    // on reçoit du front le score et le vaiqueur du match

    updatescore : async  (id, match)  => {
         
        
        let query = `UPDATE "match"
         SET 
             score_host = $1,
             score_visitor = $2,
             winner = $3
         WHERE id = $4
         RETURNING *;`;
         const data = [
             match.score_host,
             match.score_visitor,
             match.winner,
             id
         ]

         try {
             
            const {rows} = await db.query(query, data) 
            return rows[0]
         } catch (err){
             
            console.trace(err);
         }
     
    },

    getBetWithMatch : async (id) => {

        const query  = ` SELECT * FROM all_bet
        WHERE matchid = $1;`
        const result = await db.query(query, [id])

        return result.rows[0]
    },

    updateGain : async (id, gain) => {

        const query = `UPDATE bet SET gain = $1,
             closure_time = now()
             WHERE id=$2;`
        const data = [
            gain,
            id
        ];
      const result =  await db.query(query, data)
      return new Bet(result.rows[0])
    }

    
    // il faut enregister ce résultat en bdd

    
    // Une fois enregister il faut récupérer le patrsi qui lui est  associé

    
    // calculer ensuite le gains du paris et l'enrgister en bdd 

    
    // renviyter le paris résolu au front

};




module.exports = resolveBetMapper;