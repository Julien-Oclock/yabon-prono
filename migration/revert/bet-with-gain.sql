-- Revert yabon-prono:bet-with-gain from pg

BEGIN;

DROP VIEW bet_with_gain;

COMMIT;
