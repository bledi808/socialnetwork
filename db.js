// where our db queries live
var spicedPg = require("spiced-pg"); // middleman or client
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social-network"
); // port 5432 is the standard db port

//insert registration details into users table
module.exports.createUser = (first, last, email, password) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `,
        [first, last, email, password]
    );
};

// SELECT to get user info by email address (in post /login)
module.exports.getPwByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

// INSERT into new table (reset_codes) the secret code you generated with the help of cryptoRandomString
module.exports.addResetCode = (code, email) => {
    return db.query(
        `
        INSERT INTO reset_codes (code, email)
        VALUES($1,$2)
    `,
        [code, email]
    );
};

// SELECT that finds code in the new table that matches the email address and is less than 10 minutes old
module.exports.getCodeByEmail = (email) => {
    return db.query(
        `
        SELECT code 
        FROM reset_codes
        WHERE email=$1 
        AND CURRENT_TIMESTAMP - timestamp <= '10 minutes'
        ORDER BY id DESC 
        LIMIT 1;
        `,
        [email]
    );
};

// UPDATE password of user's table by email address
module.exports.updatePassword = (password, email) => {
    return db.query(
        `
        UPDATE users 
        SET password=$1
        WHERE email = $2
    `,
        [password, email]
    );
};

//Get user info from users table
module.exports.getUserInfo = (userId) => {
    return db.query(`SELECT * FROM users WHERE id=$1`, [userId]);
};

//Update Profile pic
module.exports.uploadProfilePic = (imgUrl, userId) => {
    return db.query(
        `
        UPDATE users
        SET url=$1
        WHERE id=$2
        RETURNING *
        `,
        [imgUrl, userId]
    );
};

//Update Bio
module.exports.updateBio = (bio, userId) => {
    return db.query(
        `
        UPDATE users
        SET bio=$1
        WHERE id=$2
        RETURNING *
        `,
        [bio, userId]
    );
};

//Find people - returns last 3 users to sign up
module.exports.findPeople = () => {
    return db.query(
        `
        SELECT id, first, last, url FROM users 
        ORDER BY id 
        DESC LIMIT 3
        `
    );
};

//Find people matching serach query text
module.exports.findMatchingPeople = (str) => {
    return db.query(
        `
        SELECT id, first, last, url FROM users
        WHERE first ILIKE $1
        ORDER BY first 
        ASC LIMIT 5
        `,
        [str + "%"]
    );
};

//check friendship status
module.exports.checkFriendStatus = (userId, otherId) => {
    return db.query(
        `
        SELECT * FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
        `,
        [userId, otherId]
    );
};

//INSERT - runs when you send a friend request
module.exports.sendFriendRequest = (userId, otherId) => {
    return db.query(
        `
        INSERT INTO friendships 
        (sender_id, recipient_id) 
        VALUES($1, $2);
        `,
        [userId, otherId]
    );
};

module.exports.cancelFriendRequest = (userId, otherId) => {
    return db.query(
        `
        DELETE FROM friendships 
        WHERE sender_id=$1 AND recipient_id=$2
        `,
        [userId, otherId]
    );
};

module.exports.acceptFriendRequest = (userId, otherId) => {
    return db.query(
        `
        UPDATE friendships 
        SET accepted=true
        WHERE sender_id=$2 AND recipient_id=$1
        `,
        [userId, otherId]
    );
};

module.exports.removeFriend = (userId, otherId) => {
    return db.query(
        `
        DELETE FROM friendships 
        WHERE sender_id=$1 AND recipient_id=$2 
        OR sender_id=$2 AND recipient_id=$1 
        `,
        [userId, otherId]
    );
};

// Get Firends and Friend Requests
// Users that you've sent a friend request to will NOT show up in this query - add this as BONUS
////////BONUS PART ////// ON (accepted = false AND sender_id = $1 AND recipient_id = users.id) - added

module.exports.getFriends = (userId) => {
    return db.query(
        `
        SELECT users.id, first, last, url, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = false AND sender_id = $1 AND recipient_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
        `,
        [userId]
    );
};

// delete profile image
module.exports.deleteImage = (userId) => {
    return db.query(
        `
        UPDATE users
        SET url = null
        WHERE id=$1
        `,
        [userId]
    );
};

// delete account
module.exports.deleteAccount = (userId) => {
    return db.query(
        `
        DELETE FROM users
        WHERE id=$1
        `,
        [userId]
    );
};
