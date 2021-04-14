const { expect } = require('chai');

const { postBookmakerSchemas, bookmakerSchemas } = require('../app/shemas/bookmarker');

let mockBookmaker;

describe('bookmaker schema', function () {

    before(function() {

        mockBookmaker = {
            brand: "unibet",
            slug: "unibet.com"
        };
    });

    it ('should validate a valid bookmaker', function() {

        expect(postBookmakerSchemas.validate(mockBookmaker)).not.to.have.property('error');

    });

    it ('should not validate a bookmaker with an brand of type number', function() {

        mockBookmaker.brand = 19;

        const validation2 = postBookmakerSchemas.validate(mockBookmaker);

        expect(validation2).to.have.property('error');

        expect(validation2.error.details[0].path[0]).to.equal('brand');
    });
});

describe('Patch bookmaker schema', function () {

    before(function () {

        mockBookmaker = {
            brand: "unibet",
        };
    });

    it('should validate a valid bookmaker', function () {

        expect(bookmakerSchemas.validate(mockBookmaker)).not.to.have.property('error');

    });

    it('should not validate a bookmaker with an brand of type number', function () {

        mockBookmaker.brand = 19;

        const validation2 = bookmakerSchemas.validate(mockBookmaker);

        expect(validation2).to.have.property('error');

        expect(validation2.error.details[0].path[0]).to.equal('brand');
    });

});