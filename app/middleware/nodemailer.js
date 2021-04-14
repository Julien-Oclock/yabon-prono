const nodemailer = require('nodemailer')



const checkingMail = (req, res, next ) => {

    const {mail} = req.body
    console.log(mail)
    const transporter = nodemailer.createTransport( {
        service : "outlook",
        auth : {

            user : 'yabon-prono@outlook.fr',
            pass : 'O\'clock2021'
        }
    });

    const options = {
        from : 'yabon-prono@outlook.fr',
        to : mail,
        subject : 'Mail de Yabon',
        text : 'Wow ça marche, coucou les Yabonés !',
    };


    transporter.sendMail(options, (err, info) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(("Sent : " + info.response));
    })

    next();

}

module.exports = checkingMail