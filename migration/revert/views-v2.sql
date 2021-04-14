-- Revert yabon-prono:views-v2 from pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW last_bet_resolved,
    last_bet,
    all_last_bet_resolved,
    last_bet_incoming,
    three_last_bet,
    all_match,
    all_bookmaker,
    worst_bet,
    best_bet,
    all_bet;


COMMIT;
