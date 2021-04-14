-- Deploy yabon-prono:insert-data to pg

BEGIN;

INSERT INTO public."user"
		(lastname, firstname, mail, "password", "role")
        VALUES 
		    ('Yabon', 'Admin', 'yabon-prono@outlook.fr', 'yabonprono', 'admin');

INSERT INTO comment (content, rate, "user_id")
    VALUES( 'Yabon trop bon', 5, 1),
    ( 'Yabon trop pas bon', 1, 1);


INSERT INTO public.bookmaker
		(brand, slug)
		VALUES
			('unibet','https://unibet.fr/pari-sportif-poker'),
			('betclic','https://www.betclic.fr/');



INSERT INTO public.match(
	host_team, visitor, odds_1, odds_2, odds_draw, score_host, score_visitor)
	VALUES ('PSG', 'Marseille', 2.25, 1.58, 1, 2, 1),
	    ('PSG', 'Lyon', 2.25, 1.58, 1, 1, 1),
	    ('Lilles', 'Strasbourg', 2.25, 1.58, 1, 1, 3),
	    ('Lyon', 'Nîmes', 2.25, 1.58, 1, 2, 1),
	    ('Montpellier', 'Bordeaux', 2.25, 1.58, 1, 3, 1),
	    ('Dijon', 'Nantes', 2.25, 1.58, 1, 1, 1),
	    ('Rennes', 'Guinguamps', 2.25, 1.58, 1, 3, 1),
	    ('Metz', 'Strasbourg', 2.25, 1.58, 1, 2, 1),
	    ('Monaco', 'Barcelonne', 2.25, 1.58, 1, 0, 1),
	    ('Lens', 'Dijon', 2.25, 1.58, 1, 1, 3),
	    ('Angers', 'Metz', 2.25, 1.58, 1, 4, 1),
	    ('Nice', 'Barcelonne', 2.25, 1.58, 1, 2, 3),
	    ('Reims', 'Lorient', 2.25, 1.58, 1, 3, 1),
	    ('Strasbourg', 'Angers', 2.25, 1.58, 1, 4, 1),
	    ('Bordeaux', 'Reims', 2.25, 1.58, 1, 1, 2),
	    ('Lorient', 'Marseille', 2.25, 1.58, 1, 4, 1),
	    ('Saint-Etienne', 'Lyon', 2.25, 1.58, 1, 5, 1),
	    ('Nîmes', 'Montpellier', 2.25, 1.58, 1, 5, 1),
	    ('Nantes', 'Rennes', 2.25, 1.58, 1, 6, 1),
	    ('Manchester United', 'Leeds', 2.25, 1.58, 1, 3, 1),
	    ('Chelsea', 'Arsenal', 2.25, 1.58, 1, 2, 1),
	    ('Tottenham', 'Wolfs', 2.25, 1.58, 1, 4, 1),
	    ('Birmingham', 'Man City', 2.25, 1.58, 1, 4, 1),
         ('Everton', 'West Ham', 2.25, 1.58, 1, 5, 1),
	    ('Leicester', 'Southsampton', 2.25, 1.58, 1, 8, 1),
	    ('Fulham', 'Burnley', 2.25, 1.58, 1, 1, 0),
	    ('Aston Villa', 'Newcastle', 2.25, 1.58, 1, 1, 0),
	    ('Liverpool', 'Manchester City', 2.25, 1.58, 1, 1, 2),
	    ('Real Madrid', 'Barcelonne', 2.25, 1.58, 1, 1, 3),
	    ('PSG', 'Barcelonne', 2.25, 1.58, 1, 4, 1),
	    ('Barcelonne', 'PSG', 2.25, 1.58, 1, 2, 1),
	    ('Bayern Munich', 'Lazio Rome', 2.20, 3.87, 3.20, 3, 1),
	    ('Atlético de Madrid', 'Barcelonne', 2.25, 1.58, 3.25, 2, 1),
	    ('Seville FC', 'Valencia', 2.25, 1.58, 2.85, 2, 1),
	    ('Betis Seville', 'Real Sociedad', 2.25, 1.58, 2.36, 2, 1),
	    ('Villareal', 'Celta Vigo', 2.25, 1.58, 1.98, 2, 1),
	    ('Grenade CF', 'Barcelonne', 2.25, 1.58, 3.25, 3, 1),
	    ('Real Madrid', 'Osasuna', 2.25, 1.58, 3.12, 3, 1),
	    ('Cadix', 'Elche', 2.25, 1.58, 2.47, 1, 3),
	    ('Huesca', 'Alavès', 2.25, 1.58, 2.36, 1, 3);


INSERT INTO bet(beting_team, bet_odds, mise, trust, comment, match_id, "user_id", bookmaker_id)
    VALUES ('PSG', 2.25, 50, 4, 'fonce ma gueule !', 1, 1, 1),
	    ('PSG', 2.25, 50, 4, 'fonce ma gueule !', 2, 1, 1),
	    ('Lilles', 2.25, 50, 4, 'fonce ma gueule !', 3, 1, 1),
	    ('Lyon', 2.25, 50, 4, 'fonce ma gueule !', 4, 1, 1),
	    ('Montpellier', 2.25, 50, 4, 'fonce ma gueule !', 5, 1, 1),
	    ('Nantes', 1.58, 30, 4, 'fonce ma gueule !', 6, 1, 1),
	    ( 'Guinguamps', 1.58, 25, 4, 'fonce ma gueule !', 7, 1, 1),
	    ('Metz', 2.25, 30, 4, 'fonce ma gueule !', 8, 1, 1),
	    ('Monaco', 2.25, 50, 4, 'fonce ma gueule !', 9, 1, 1),
	    ('Lens',  2.25, 15, 4, 'fonce ma gueule !', 10, 1, 1),
	    ('Angers', 2.25, 30, 4, 'fonce ma gueule !', 11, 1, 1),
	    ('Nice',  2.25, 50, 4, 'fonce ma gueule !', 12, 1, 1),
	    ('Reims', 2.25, 50, 4, 'fonce ma gueule !', 13, 1, 1),
	    ('Strasbourg',  2.25, 20, 4, 'fonce ma gueule !', 14, 1, 1),
	    ('Bordeaux',  2.25, 50, 4, 'fonce ma gueule !', 15, 1, 1),
	    ('Lorient', 2.25, 50, 4, 'fonce ma gueule !', 16, 1, 1),
	    ('Saint-Etienne', 2.25, 50, 4, 'fonce ma gueule !', 17, 1, 1),
	    ('Nîmes',  2.25, 50, 4, 'fonce ma gueule !', 18, 1, 1),
	    ('Nantes',  2.25, 10, 4, 'fonce ma gueule !', 19, 1, 1),
	    ('Manchester United',  2.25, 50, 4, 'fonce ma gueule !', 20, 1, 1),
	    ('Chelsea',  2.25, 50, 4, 'fonce ma gueule !', 21, 1, 1),
	    ('Tottenham', 2.25, 50, 4, 'fonce ma gueule !', 22, 1, 1),
	    ('Birmingham', 2.25, 50, 4, 'fonce ma gueule !', 23, 1, 1),
         ('Everton', 2.25, 80, 4, 'fonce ma gueule !', 24, 1, 1),
	    ('Leicester', 2.25, 50, 4, 'fonce ma gueule !', 25, 1, 1),
	    ('Fulham', 2.25, 100, 4, 'fonce ma gueule !', 26, 1, 1),
	    ( 'Newcastle', 1.58, 50, 4, 'fonce ma gueule !', 27, 1, 1),
	    ('Liverpool',  2.25, 50, 4, 'fonce ma gueule !', 28, 1, 1),
	    ('Real Madrid', 2.25, 50, 4, 'fonce ma gueule !', 29, 1, 1),
	    ('PSG',  2.25, 50, 4, 'fonce ma gueule !', 30, 1, 1),
	    ('Barcelonne',  2.25, 70, 4, 'fonce ma gueule !', 31, 1, 1),
	    ('Bayern Munich',  2.25, 50, 4, 'fonce ma gueule !', 32, 1, 1),
	    ('Atlético de Madrid',  2.25, 50, 4, 'fonce ma gueule !', 33, 1, 1),
	    ('Seville FC', 2.25, 50, 4, 'fonce ma gueule !', 34, 1, 1),
	    ('Betis Seville', 2.25, 50, 4, 'fonce ma gueule !', 35, 1, 1),
	    ('Villareal',  2.25, 50, 4, 'fonce ma gueule !', 36, 1, 1),
	    ('Grenade CF', 2.25, 40, 4, 'fonce ma gueule !', 37, 1, 1),
	    ('Real Madrid', 2.25, 50, 4, 'fonce ma gueule !', 38, 1, 1),
	    ('Cadix', 2.25, 20, 4, 'fonce ma gueule !', 39, 1, 1),
	    ('Huesca', 2.25, 100, 4, 'fonce ma gueule !', 40, 1, 1);
	   




COMMIT;
