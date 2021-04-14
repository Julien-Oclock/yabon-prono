-- Deploy yabon-prono:view-three_last_bet_incoming to pg

BEGIN;

-- Crée une view qui renvoit les 3 dernier paris quand elle et appeler 
CREATE VIEW three_last_bet_incoming AS
SELECT 
bet.*,
"match".id AS matchId, "match".host_team, "match".visitor, "match".odds_1,"match".odds_2,"match".odds_draw, "match".score_host, "match".score_visitor, "match".winner,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug
FROM bet
JOIN "match" ON "match".id = bet.match_id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
WHERE bet.gain IS NULL
ORDER BY created_at LIMIT 3;

COMMIT;

