const resolveBet = require('../models/resolveBet')
const resolveBetsMapper = require('../models/resolveBetMapper')


const resolveBetController = {


    resolveMatch : async (req, res) => {

        const {id}  = req.params

        const data = req.body

        const match = await resolveBetsMapper.updatescore(id ,data)

        const matchId = match.id
        

        const betWithMatch = await resolveBetsMapper.getBetWithMatch(matchId)
       console.log(betWithMatch)


        if(betWithMatch) {
               
            if( betWithMatch.beting_team === betWithMatch.winner) {

                betWithMatch.gain = betWithMatch.mise * betWithMatch.bet_odds

            } else {
                betWithMatch.gain = -(betWithMatch.mise)
            }
        }
        console.log(betWithMatch.id)
        console.log(betWithMatch.gain)
        
        await resolveBetsMapper.updateGain( betWithMatch.id, betWithMatch.gain)
        
        res.json(betWithMatch)

    }


}


module.exports = resolveBetController;