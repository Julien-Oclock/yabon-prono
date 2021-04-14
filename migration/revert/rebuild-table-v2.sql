-- Revert yabon-prono:rebuild-table-v2 from pg

BEGIN;

DROP TABLE  bet, match, bookmaker, comment, "user";

COMMIT;
