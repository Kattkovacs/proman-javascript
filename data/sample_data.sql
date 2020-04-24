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
    status_id integer DEFAULT 0,
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

INSERT INTO boards VALUES (1,'ProMan Sprint 1');
INSERT INTO boards VALUES (2,'ProMan Sprint 2');
SELECT pg_catalog.setval('boards_id_seq', 2, true);

INSERT INTO statuses VALUES (0,'new');
INSERT INTO statuses VALUES (1,'in progress');
INSERT INTO statuses VALUES (2,'testing');
INSERT INTO statuses VALUES (3,'done');
SELECT pg_catalog.setval('statuses_id_seq', 4, true);

INSERT INTO cards VALUES (1,1,'Boards list overview',3,0);
INSERT INTO cards VALUES (2,1,'Create public boards',1,1);
INSERT INTO cards VALUES (3,1,'Rename board',0,0);
INSERT INTO cards VALUES (4,1,'Board view with 4 default columns',3,0);
INSERT INTO cards VALUES (5,1,'Board view with dynamic columns',0,0);
INSERT INTO cards VALUES (6,1,'Rename columns',0,1);
INSERT INTO cards VALUES (7,1,'Create card',0,0);
INSERT INTO cards VALUES (8,1,'Order the cards',0,1);
INSERT INTO cards VALUES (9,1,'Change card status',0,0);
INSERT INTO cards VALUES (10,1,'Edit card title',0,0);
INSERT INTO cards VALUES (11,1,'Offline access',0,0);
INSERT INTO cards VALUES (12,1,'User registration',1,1);
INSERT INTO cards VALUES (13,1,'User login',1,1);
INSERT INTO cards VALUES (14,1,'Private boards',0,1);
INSERT INTO cards VALUES (15,1,'User logout',1,1);
INSERT INTO cards VALUES (16,1,'SQL Database',3,1);
INSERT INTO cards VALUES (17,1,'Display cards from database',3,1);
INSERT INTO cards VALUES (18,1,'DOM manipulation',1,1);
INSERT INTO cards VALUES (19,1,'DEMO ;)',2,1);
INSERT INTO cards VALUES (20,2,'ProMan Sprint 2',0,1);
SELECT pg_catalog.setval('cards_id_seq', 20, true);
