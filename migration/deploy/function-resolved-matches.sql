-- Deploy yabon-prono:function-resolved-matches to pg

BEGIN;

-- XXX Add DDLs here.

CREATE FUNCTION resolve_game(host text, visit text, Mid int) RETURNS  "match" AS $$
	UPDATE "match" 
	SET winner = (
		CASE
		WHEN score_host = score_visitor THEN 'draw'
		WHEN score_host < score_visitor THEN visit::text
		WHEN score_host > score_visitor THEN host::text END)
		WHERE id = Mid
		RETURNING *
$$ LANGUAGE sql;


COMMIT;
