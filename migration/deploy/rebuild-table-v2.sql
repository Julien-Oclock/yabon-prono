-- Deploy yabon-prono:rebuild-table-v2 to pg

BEGIN;

CREATE TABLE "user"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lastname text NOT NULL,
    firstname text NOT NUll,
    mail valid_mail NOT NULL UNIQUE,
    "password" text NOT NULL UNIQUE,
    "role" text DEFAULT 'user'

);

CREATE TABLE comment (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content text NOT NULL,
    rate rating NOT NULL,
    "user_id" int REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE bookmaker (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand text NOT NULL UNIQUE,
    slug text NOT NULL
);
;

CREATE TABLE match(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    host_team text NOT NULL,
    visitor text NOT NULL,
    odds_1 pos_float NOT NULL,
    odds_2 pos_float NOT NULL,
    odds_draw pos_float NOT NULL,
    score_host int,
    score_visitor int,
    winner text
);


CREATE TABLE bet(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    beting_team text NOT NULL,
    bet_odds pos_float NOT NULL,
    mise pos_float NOT NULL,
    gain float,
    closure_time timestamptz,
    trust rating NOt NULL,
    comment text NOT NULL,
    match_id int NOT NULL REFERENCES match(id) ON DELETE CASCADE,
    "user_id" int NOT NULL REFERENCES "user"(id),
    bookmaker_id int NOT NULL REFERENCES bookmaker(id) ON DELETE CASCADE
);


COMMIT;
