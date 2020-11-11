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
