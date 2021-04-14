-- Revert yabon-prono:insert-data from pg

BEGIN;

-- XXX Add DDLs here.

DELETE FROM  bet;

DELETE FROM match;
 
DELETE FROM bookmaker;
 
DELETE FROM comment;

DELETE FROM "user";

COMMIT;
