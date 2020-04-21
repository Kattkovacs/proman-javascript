ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_cards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_statusses_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_statuses_id CASCADE;

DROP TABLE IF EXISTS public.boards CASCADE;
CREATE TABLE boards (
    id serial NOT NULL,
    title varchar
);

DROP TABLE IF EXISTS public.statuses CASCADE;
CREATE TABLE statuses (
    id serial NOT NULL,
    title varchar
);

DROP TABLE IF EXISTS public.cards CASCADE;
CREATE TABLE cards (
    id serial NOT NULL,
    board_id  integer,
    title varchar,
    status_id integer,
    "order" integer
);

ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_boards_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_cards_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_statuses_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_statuses_id FOREIGN KEY (status_id) REFERENCES statuses(id) ON DELETE CASCADE;

create unique index boards_id_uindex on boards (id);

create unique index cards_id_uindex on cards (id);
create unique index statuses_id_uindex on statuses (id);
create unique index statuses_title_uindex on statuses (title);

INSERT INTO boards VALUES (1,'Board 1');
INSERT INTO boards VALUES (2,'Board 2');
SELECT pg_catalog.setval('boards_id_seq', 2, true);

INSERT INTO statuses VALUES (0,'new');
INSERT INTO statuses VALUES (1,'in progress');
INSERT INTO statuses VALUES (2,'testing');
INSERT INTO statuses VALUES (3,'done');
SELECT pg_catalog.setval('statuses_id_seq', 4, true);

INSERT INTO cards VALUES (1,1,'new card 1',0,0);
INSERT INTO cards VALUES (2,1,'new card 2',0,1);
INSERT INTO cards VALUES (3,1,'in progress card',1,0);
INSERT INTO cards VALUES (4,1,'planning',2,0);
INSERT INTO cards VALUES (5,1,'done card 1',3,0);
INSERT INTO cards VALUES (6,1,'done card 1',3,1);
INSERT INTO cards VALUES (7,2,'new card 1',0,0);
INSERT INTO cards VALUES (8,2,'new card 2',0,1);
INSERT INTO cards VALUES (9,2,'in progress card',1,0);
INSERT INTO cards VALUES (10,2,'planning',2,0);
INSERT INTO cards VALUES (11,2,'done card 1',3,0);
INSERT INTO cards VALUES (12,2,'done card 1',3,1);
SELECT pg_catalog.setval('cards_id_seq', 12, true);