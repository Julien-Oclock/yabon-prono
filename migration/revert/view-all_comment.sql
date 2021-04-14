-- Revert yabon-prono:view-all_comment from pg

BEGIN;

DROP VIEW all_comment;

COMMIT;
