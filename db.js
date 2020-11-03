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
