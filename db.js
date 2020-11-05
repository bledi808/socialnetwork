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
