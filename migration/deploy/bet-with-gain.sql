-- Deploy yabon-prono:bet-with-gain to pg

BEGIN;

-- XXX Add DDLs here.

CREATE VIEW bet_with_gain AS
SELECT 
bet.*,
"match".id AS matchId, "match".host_team, "match".visitor, "match".odds_1,"match".odds_2,"match".odds_draw, "match".score_host, "match".score_visitor, "match".winner,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug
FROM bet
JOIN "match" ON "match".id = bet.match_id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
WHERE bet.gain IS NOT NULL;

COMMIT;
