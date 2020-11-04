const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db");
const { hash, compare } = require("./bc");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");

//////////////////////////////////////// MIDDLEWARE ////////////////////////////////////////
app.use(
    cookieSession({
        secret: "whatever I want my secret to be",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(compression());
app.use(express.json());
app.use(express.static("./public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//////////////////////////////////////// ROUTES ///////////////////////////////////////
app.get("/welcome", (req, res) => {
    console.log("ACCESSED GET /welcome route ");
    console.log("req.session at /welcome", req.session);
    let { userId } = req.session;
    console.log("userId at /welcome", userId);

    if (userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("ACCESSED  POST /register route");
    const { first, last, email, password } = req.body;
    if (first !== "" && last !== "" && email !== "" && password !== "") {
        db.getPwByEmail(email)
            .then((results) => {
                if (results.rows.length === 0) {
                    hash(password)
                        .then((hashedPw) => {
                            db.createUser(first, last, email, hashedPw)
                                .then(({ rows }) => {
                                    console.log(
                                        "results in POST /register",
                                        rows
                                    );
                                    req.session.userId = rows[0].id;
                                    res.json({ success: true });
                                    // console.log("req.session.userId", req.session.userId);
                                    // console.log("rows.id", rows[0].id);
                                })
                                .catch((err) => {
                                    console.log(
                                        "error with createUser() in POST /register",
                                        err
                                    );
                                    //render registration page again
                                    // res.json({ success: false }); // confirm this should go here
                                });
                        })
                        .catch((err) => {
                            console.log(
                                "error with hasingPw() in POST /register",
                                err
                            );
                            //render registration page again
                            // res.json({ success: false }); // confirm this should go here
                        });
                } else {
                    console.log("email address is already being used");
                    //render registration page again
                    // res.json({ success: false }); // confirm this should go here
                }
            })
            .catch((err) => {
                console.log("error in /register with getPwByEmail()", err);
            });
        //render registration page again
        // res.json({ success: false }); // confirm this should go here
    } else {
        console.log("all input fields must be populated");
        res.json({ success: false }); // confirm this should go here
        //render registration page again???
    }
});

app.post("/login", (req, res) => {
    console.log("ACCESSED  POST /login route");
    console.log("req.body at POST /login", req.session);

    const { email, password } = req.body;
    console.log("req.session at POST /login", req.session);

    if (email !== "" && password !== "") {
        db.getPwByEmail(email)
            .then(({ rows }) => {
                let hashedPw = rows[0].password;
                compare(password, hashedPw)
                    .then((match) => {
                        if (match) {
                            req.session.userId = rows[0].id;
                            res.json({ success: true });
                            console.log(
                                "server-side: login successful",
                                rows[0]
                            );
                            console.log(
                                "req.session.userId = rows[0].id",
                                (req.session.userId = rows[0].id)
                            );
                        } else {
                            console.log("Incorrect email and/or password ");
                            //conditionally render error message: "Incorrect email and/or password"
                            // res.json({ success: false }); // confirm this should go here
                            //render login page page again?
                        }
                    })
                    .catch((err) => {
                        console.log("error in POST /login compare", err);
                        //conditionally render error message: "Incorrect email and/or password"
                        // res.json({ success: false }); // confirm this should go here
                        //render login page again?
                    });
            })
            .catch((err) => {
                console.log("error in POST /login with getPwByEmail()", err);
                //conditionally render error message: "Incorrect email and/or password "
                // res.json({ success: false }); // confirm this should go here
                //render login page again?
            });
    } else {
        console.log("all input fields must be populated");
        // res.json({ success: false }); // confirm this should go here
        //render login page again?
    }
});

app.post("/reset/start", (req, res) => {
    console.log("ACCESSED POST /reset/start route ");
    const { email } = req.body;

    if (email !== "") {
        db.getPwByEmail(email)
            .then(({ rows }) => {
                if (rows.length === 1) {
                    // generate random resetCode
                    const resetCode = cryptoRandomString({
                        length: 6,
                    });
                    // insert resetCode + email into database
                    db.addResetCode(resetCode, email)
                        .then(() => {
                            // send Email to user containing the code
                            let recipient = email;
                            let message = `Plese use the code ${resetCode} to reset you account password for "The Anti-Social Network"`;
                            let subject = `${resetCode}: Your Password Reset Code`;
                            ses.sendEmail(recipient, message, subject)
                                .then(() => {
                                    res.json({
                                        success: true,
                                    });
                                })
                                .catch((err) => {
                                    console.log(
                                        "error in POST /reset/start with ses.sendEmail()",
                                        err
                                    );
                                });
                            //send reponse to clientside
                        })
                        .catch((err) => {
                            console.log(
                                "error in POST /reset/start with addSecretCode()",
                                err
                            );
                        });
                } else {
                    console.log("this email does not exist");
                    // res.json({ error: true });// render error msg here
                }
            })
            .catch((err) => {
                console.log(
                    "error in POST /reset/start with getPwByEmail()",
                    err
                );
            });
    } else {
        console.log("email must be populated");
    }
});

app.post("/reset/verify", (req, res) => {
    console.log("ACCESSED POST /reset/verify route ");
    const { code, password } = req.body;
    res.json({ success: true });

    // if (code !== "" && password !== "") {
    //     db.getPwByEmail(email)
    //         .then(({ rows }) => {
    //             console.log(
    //                 " rows in POST /reset/start from getPwByEmail()",
    //                 rows
    //             );
    //             if (rows.length === 1) {
    //                 res.json({ success: true });
    //             } else {
    //                 res.json({ success: false });
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(
    //                 "error in POST /reset/start with getPwByEmail()",
    //                 err
    //             );
    //         });
    // } else {
    //     console.log("email must be populated");
    // }
});

//it is important that the * route is the LAST GET route
app.get("*", function (req, res) {
    console.log("ACCESSED catch-all * route ");
    // console.log("req.session at *", req.session);
    let { userId } = req.session;
    if (!userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log(
        "<><><><><><><><><><><><><><><>| social network listenting |<><><><><><><><><><><><><><><>"
    );
});
