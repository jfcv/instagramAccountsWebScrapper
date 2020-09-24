CREATE DATABASE fullstackpern;

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    account TEXT
);

INSERT INTO accounts (account)
    VALUES  ('https://www.instagram.com/juliojaramilloo/?hl=es-la'),
            ('https://www.instagram.com/juanes/?hl=es-la');