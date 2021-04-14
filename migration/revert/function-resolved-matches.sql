-- Revert yabon-prono:function-resolved-matches from pg

BEGIN;

-- XXX Add DDLs here.

DROP function resolve_game;

COMMIT;
