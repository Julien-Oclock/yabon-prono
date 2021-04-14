require('dotenv').config();

const port = process.env.PORT || 5478;

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./app/router');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.json());

app.use(cors());



/*
{
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders : ['Content-Type', 'Authorization'],

}


app.use( (req, res, next) => {
    res.header("Access-Control-Allow-origin", "*")
    res.header("Access-Control-Allow-headers", "Origin, x-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
    next();
})*/
const expireDate = 1000 *60 *60 * 2;
app.use(session({
    resave : true,
    saveUninitialized : true,
    secret : 'c5613c06f85d2b50',
    cookie : {
        maxAge: expireDate,
        sameSite : true,
        token : '',

    }
}))

const expressSwagger = require('express-swagger-generator')(app);
let options = require('./swagger-config.json');
options.basedir = __dirname; // __dirname désigne le dossier du point d'entrée

expressSwagger(options);

app.use('/v1', router);

app.listen(port, () => { console.log(`Listening on http://localhost:${port}`) });

