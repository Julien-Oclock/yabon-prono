-- Revert yabon-prono:rebuild-table-v2 from pg

BEGIN;

DROP DOMAIN rating ,valid_mail, neg_float, pos_float;

COMMIT;
