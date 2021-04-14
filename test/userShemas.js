const { expect } = require('chai');

const { userSchema, postUserSchema } = require('../app/shemas/user');

let mockUser; 

describe('Post user schema', function() {

    before(function() {

        mockUser = {
        lastname: "julien",
        firstname: "rodriguez",
        mail: "lebg@gmail.com",
        password: "rpsjuju",
        role: "user"
        };
    });

    it ('should validate a valid user', function() {

        expect(postUserSchema.validate(mockUser)).not.to.have.property('error');
    });

    it ('should not a validate a user with an last name of type number', function() {

        mockUser.lastname = 1;

        const validation2 = postUserSchema.validate(mockUser);

        expect(validation2).to.have.property('error');

        expect(validation2.error.details[0].path[0]).to.equal('lastname');
    });
});

describe('Patch user schema', function () {

    before(function () {

        mockUser = {
            lastname: "julien",
            firstname: "rodriguez",
            mail: "lebg@gmail.com",
            password: "rpsjuju",
            role: "user"
        };
    });

    it('should validate a valid user', function () {

        expect(userSchema.validate(mockUser)).not.to.have.property('error');
    });

    it('should not a validate a user with an last name of type number', function () {

        mockUser.lastname = 1;

        const validation2 = userSchema.validate(mockUser);

        expect(validation2).to.have.property('error');

        expect(validation2.error.details[0].path[0]).to.equal('lastname');
    });
});