-- Deploy yabon-prono:view-all_comment to pg

BEGIN;

ALTER TABLE comment ADD COLUMN created_at timestamptz DEFAULT now();

CREATE VIEW all_comment AS
SELECT 
"comment".id, "comment".content, "comment".rate, "user".firstName, comment.created_at
FROM "comment"
JOIN "user" ON "user".id = "comment".user_id
ORDER BY created_at DESC;

COMMIT;
