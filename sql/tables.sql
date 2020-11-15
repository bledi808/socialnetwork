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

INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,2,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,3,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,4,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,5,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(1,6,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(7,1,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(8,1,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(10,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(11,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(12,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(13,1,false);