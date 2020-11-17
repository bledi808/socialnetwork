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
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(7,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(8,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(9,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,10,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,11,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,12,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(13,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,14,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,15,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,16,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,17,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,18,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(19,1,false);

INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,22,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,32,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,42,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,34,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,35,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,46,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(7,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(8,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(9,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,14,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,15,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,16,false);
