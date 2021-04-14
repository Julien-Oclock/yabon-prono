require('dotenv').config();

const db = require('../app/database');

const { postBookmakerSchemas, bookmakerSchemas } = require('../app/shemas/bookmarker');
const Bookmarker = require('../app/models/bookmakers');
const bookmarkerMapper = require('../app/models/bookmakersMapper');

const { expect } = require('chai');

const theIds = {};

describe ('Bookmaker model', function() {

    before(function() {

        mockBookmaker = {
            brand: "licorneBet",
            slug:"licorneBet.com"
        };
    });

    it ('should create an instance of Bookmaker from an object litteral', function() {

        const theBookmaker = new Bookmarker(mockBookmaker);

        expect(theBookmaker).to.have.property('brand').to.equal('licorneBet');
    });

    it ('should create an instance of sport form object litteral with an brand of type number', function() {

        mockBookmaker.brand = 1;

        const validation2 = new Bookmarker(mockBookmaker);

        expect(bookmakerSchemas.validate(validation2)).to.have.property('error');
    });

});

    describe('bookmaker mapper', function () {

        mockBookmaker = {
            brand: "poneyBet",
            slug: "poneyBet.com"
        };

        before(async function () {

            {
                const { rows } = await db.query('INSERT INTO bookmaker (brand, slug) VALUES ($1, $2) RETURNING id;', ['mockleag', 'lietreet.com']);

                theIds.bookmaker = rows[0].id
            }
        });

        after(async function () {

            await db.query('DELETE FROM bookmaker WHERE id = $1;', [theIds.bookmaker]);
        }); 

        describe('#allBookmakers', function() {

            it ('should fetch an array of Bookmaker', async function() {
                const theBookmaker = await bookmarkerMapper.allBookmakers();

                expect(theBookmaker).to.be.a('array');
            });
        });

        describe('#findOne()', function() {

            it ('should fetch instance of bookmaker', async function() {
                const theBookmaker = await bookmarkerMapper.findOne(theIds.bookmaker);

                expect(theBookmaker).to.be.an.instanceOf(Bookmarker);
            });
        });

        describe('#save', function() {

            mockBookmaker.brand = "test";

            it ('should Post instance of bookmaker', async function() {
                
                const theBookmaker = new Bookmarker(await bookmarkerMapper.save(mockBookmaker));

                expect(theBookmaker).not.have.property('error');
            });

            it ('should save Bookmaker with an name of type number', async function() {

                mockBookmaker.brand= 1;

                const theBookmaker = new Bookmarker(await bookmarkerMapper.save(mockBookmaker));

                expect(postBookmakerSchemas.validate(theBookmaker)).to.have.property('error');
            });
        });

        describe('#update', async function() {

            it('should Update an instance of bookmaker', async function() {

                mockBookmaker.brand = "test";
                mockBookmaker.slug = "teste.com";

                const theBookmaker = new Bookmarker(await bookmarkerMapper.update(mockBookmaker, theIds.id));

                expect(theBookmaker).not.have.property('error');
            });

            it ('should Update an instace of bookmaker with type of brand is number', async function() {

                mockBookmaker = 1;

                const theBookmaker = new Bookmarker(await bookmarkerMapper.update(mockBookmaker));

                expect(bookmakerSchemas.validate(theBookmaker)).to.have.property('error');
            });
        });

        describe('#delete', async function() {

            it ('should delete a bookmaker', async function() {

                const validate = await bookmarkerMapper.delete(theIds.bookmaker);

                expect(validate).to.be.undefined;
            });
        });
    });

