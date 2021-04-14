require('dotenv').config();

const db = require('../app/database');

const { userSchema, postUserSchema } = require('../app/shemas/user');

const { expect } = require('chai');

const usersMapper = require('../app/models/usersMapper');
const User = require('../app/models/users'); 

const theIds = {};

describe ('User Model', function() {

    before(function() {

        mockUser = {
            lastname : "Juju",
            firstname :"Jaja" ,
            mail : "jujujaja@gmail.com",
            password : "voilavoila",
            role : "user"
        };
    });


    it ('should create an instance of User from object litteral', function() {
        const theUser = new User(mockUser);

        expect(theUser).to.have.property('lastname').to.equal('Juju');
    });

    it ('should create an instance of User from object litteral with visitor is a number ', function() {

        mockUser.lastname = 1;

        const validation2 = new User(mockUser);

        expect(userSchema.validate(validation2)).to.have.property('error');
    });
});

describe ('User Mapper', function() {

    mockUser = {
        lastname: "Juju",
        firstname: "Jaja",
        mail: "jujujaja@gmail.com",
        password: "voilavoila",
        role: "user"
    };

    before(async function() {

        {
            const { rows } = await db.query('INSERT INTO "user" (lastname, firstname, mail, password, role) VALUES($1, $2, $3, $4, $5) RETURNING id;', ['mockName', 'mockaLastname', 'mock@gmail.com', 'voilavoila','user']);

            theIds.user = rows[0].id;
        };
    });

    after(async function() {

        await db.query('DELETE FROM "user" WHERE id = $1', [theIds.user]);
    });

    describe('#allUser', function () {

        it('should fetch an array of User', async function () {

            const theUser = await usersMapper.allUsers();

            expect(theUser).to.be.a('array');
        });
    });

    describe('#findOne()', function () {

        it('should fetch an instance of User', async function () {
            const theUser = await usersMapper.findOne(theIds.user);

            expect(theUser).to.be.an.instanceOf(User);
        });
    });

    describe('#save', function () {

        it('should Post an instance of User', async function () {

            const theUser = new User(await usersMapper.save(mockUser));

            expect(theUser).not.have.property('error');
        });

        it('should save User with an visitor of type number', async function () {

            mockUser.lastname = 1;

            const theUser = new User(await usersMapper.save(mockUser));

            expect(postUserSchema.validate(theUser)).to.have.property('error');
        });
    });

    describe('#update', async function() {

        it('should Upadate ans instance of user', async function() {

            const theUser = new User(await usersMapper.update(mockUser, theIds.id));

            expect(theUser).not.have.property('error');
        });

        it ('should Upadate an instance of user type of lastname is number',async function(){

            mockUser.lastname = 1;
            const theUser = new User (await usersMapper.update(mockUser, theIds.id));

            expect(userSchema.validate(theUser)).to.have.property('error');
        });
    });

    describe('#login', async function() {

        it('should Login a User', async function() {

            const validate = await usersMapper.login("mock@gmail.com");

            expect(validate).not.have.property('error');
        });
    });

    describe('#delete', async function () {

        it('should Delete a User', async function () {

            const validate = await usersMapper.delete(theIds.user);

            expect(validate).to.equal('The account of mock@gmail.com was deleted');
        });
    });
});
