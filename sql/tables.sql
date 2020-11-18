DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      bio VARCHAR(255),
      url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

  CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

DROP TABLE IF EXISTS friendships CASCADE;

   CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) ON DELETE CASCADE,
   recipient_id INT REFERENCES users(id) ON DELETE CASCADE,
   accepted BOOLEAN DEFAULT false
 );

DROP TABLE IF EXISTS chat CASCADE;

CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    message VARCHAR NOT NULL,
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat (message, sender_id) VALUES('hey long time no speak',1);
INSERT INTO chat (message, sender_id) VALUES('is it?',2);
INSERT INTO chat (message, sender_id) VALUES('well, its been 17 weeks',3);
INSERT INTO chat (message, sender_id) VALUES('lol get the hint bro',4);
INSERT INTO chat (message, sender_id) VALUES('ouch :(',5);





INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,2,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,3,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,4,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,5,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,6,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,72,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,73,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,74,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,75,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,76,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,82,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,83,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,84,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,85,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,86,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,57,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,58,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,59,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,63,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,64,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,65,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,66,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,67,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,68,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,69,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,94,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,95,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,96,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,164,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,115,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,116,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,117,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,118,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(137,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(138,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(139,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(147,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(148,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(149,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(157,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(158,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(159,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(167,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(168,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(169,1,false);
