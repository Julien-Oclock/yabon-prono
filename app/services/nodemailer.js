const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport( {
    service : "outlook",
    auth : {

        user : 'yabon-prono@outlook.fr',
        pass : 'O\'clock2021'
    }
});

const options = {
    from : 'yabon-prono@outlook.fr',
    to : 'julien.lxpro@gmail.com',
    subject : 'sending mail with node.js',
    test : 'wow ça marche'
};


transporter.sendMail(options, (err, info) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(("Sent : " + info.response));
})