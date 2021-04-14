-- Deploy yabon-prono:views-v2 to pg

BEGIN;

-- VIEWS pour all bet with join match and bookmaker

CREATE VIEW all_bet AS
SELECT 
bet.*,
"match".id AS matchId, "match".host_team, "match".visitor, "match".odds_1,"match".odds_2,"match".odds_draw, "match".score_host, "match".score_visitor, "match".winner,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug
FROM bet
JOIN "match" ON "match".id = bet.match_id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id;


-- Views pour le meilleurs gain all time
CREATE VIEW best_bet AS
SELECT * 
FROM bet
WHERE "gain"
IS NOT NULL
ORDER BY "gain"
DESC LIMIT 1;

-- Worst bet all time 

CREATE VIEW worst_bet AS
SELECT * 
FROM bet
WHERE "gain"
IS NOT NULL
ORDER BY "gain"
LIMIT 1;


-- all bookmaker

CREATE VIEW all_bookmaker AS
SELECT *
FROM bookmaker;


CREATE VIEW all_match AS
SELECT * 
FROM "match";

--  3 dernier paris simple
CREATE VIEW three_last_bet AS
SELECT 
bet.*,
"match".id AS matchId, "match".host_team, "match".visitor, "match".odds_1,"match".odds_2,"match".odds_draw, "match".score_host, "match".score_visitor, "match".winner,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug
FROM bet
JOIN "match" ON "match".id = bet.match_id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
ORDER BY created_at LIMIT 3;


-- dernier paris en cours

CREATE VIEW last_bet_incoming AS
SELECT 
bet.*,
"match".id AS matchId, "match".host_team, "match".visitor, "match".odds_1,"match".odds_2,"match".odds_draw, "match".score_host, "match".score_visitor, "match".winner,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug
FROM bet
JOIN "match" ON "match".id = bet.match_id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
WHERE bet.gain IS NULL;



-- tout les derniers paris resolu
CREATE VIEW all_last_bet_resolved AS
SELECT 
bet.*,
"match".id AS matchId, "match".host_team, "match".visitor, "match".odds_1,"match".odds_2,"match".odds_draw, "match".score_host, "match".score_visitor, "match".winner,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug
FROM bet
JOIN "match" ON "match".id = bet.match_id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
WHERE bet.gain IS NOT NULL;



-- le dernier paris en cours
CREATE VIEW last_bet AS
SELECT 
bet.*,
"match".id AS matchId, "match".host_team, "match".visitor, "match".odds_1,"match".odds_2,"match".odds_draw, "match".score_host, "match".score_visitor, "match".winner,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug
FROM bet
JOIN "match" ON "match".id = bet.match_id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
WHERE bet.gain IS NULL
ORDER BY created_at LIMIT 1;

--le dernier paris resolu
CREATE VIEW last_bet_resolved AS
SELECT 
bet.*,
"match".id AS matchId, "match".host_team, "match".visitor, "match".odds_1,"match".odds_2,"match".odds_draw, "match".score_host, "match".score_visitor, "match".winner,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug
FROM bet
JOIN "match" ON "match".id = bet.match_id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
WHERE bet.gain IS NOT NULL
ORDER BY bet.gain LIMIT 1;












COMMIT;
