const fetch = require('node-fetch');



const getMatch = async () => {
    const reponse = await fetch(' https://api.the-odds-api.com/v3/odds/?apiKey=0ed042d4a8306e9e78e0ae78c7a290df&sport=soccer_epl&region=eu&mkt=h2h')

    const theMatch = await reponse.json();
    
    const matches = theMatch.data

    //console.log(matches[0])
    //console.log( matches[0].sites[2])
    //console.log( matches[0].sites[2].odds)


    const NewMaches = {}
    matches.forEach((match) => {
        NewMaches.host_team
    })


    return matches
};

getMatch()

module.exports = {
    getMatch
}