-- Deploy yabon-prono:rebuild-table-v2 to pg

BEGIN;

-- XXX Add DDLs here.

--DOMAIN Pos_float (float > 0) 
CREATE DOMAIN pos_float
    AS float
        CHECK (
        VALUE > 0
        );

--DOMAIN neg_float (float < 0)
CREATE DOMAIN neg_float
    AS float
        CHECK (
        VALUE < 0
        );

--DOMAIN valid_mail (regex = )
CREATE DOMAIN valid_mail
    AS text
        CHECK (
        VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
        );

CREATE DOMAIN rating
    AS int
        CHECK(
        VALUE < 6 AND VALUE > 0
        );


COMMIT;
