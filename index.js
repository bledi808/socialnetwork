const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db");
const { hash, compare } = require("./bc");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const s3Url = "https://s3.amazonaws.com/pimento-imgboard/";

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

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
// app.use(express.static("public"));

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

//////////////////////////////////////// LOGGED IN ROUTES ///////////////////////////////////////

app.get("/api/user", (req, res) => {
    console.log("ACCESSED GET /user route ");
    console.log("req.body at /user", req.body);
    let { userId } = req.session;
    if (userId) {
        // console.log("user is logged in");
        db.getUserInfo(userId)
            .then(({ rows }) => {
                console.log("rows in GET /user", rows);
                res.json({
                    success: true,
                    rows: rows[0],
                });
            })
            .catch((err) => {
                "err in GET /user with getUserInfo()", err;
                res.json({
                    success: false,
                    errorMsg: "Server error: Could not find user details",
                });
            });
    } else {
        //user is not logged in
        res.redirect("/");
    }
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("ACCESSED POST /upload route ");

    const { userId } = req.session;
    const { filename } = req.file;
    const url = s3Url + filename;
    if (req.file) {
        db.uploadProfilePic(url, userId)
            .then(({ rows }) => {
                console.log("POST /upload response", rows[0].url);
                res.json(rows[0].url);
            })
            .catch((err) => {
                console.log(
                    "error in POST /upload with uploadProfilePic()",
                    err
                );
                res.json({
                    success: false,
                    errorMsg: "Server error: Could not upload profile picture",
                });
            });
    } else {
        res.json({
            success: false,
            errorMsg: "Please select a file",
        });
    }
});

app.get("/api/user/:id", (req, res) => {
    console.log("ACCESSED GET /user/:id route ");
    const { id } = req.params;
    const { userId } = req.session;
    console.log("{id} in user/:id:", id);

    // if(user id exists in database) //add condition for non-existing users
    db.getUserInfo(id)
        .then(({ rows }) => {
            if (rows[0]) {
                console.log("rows[0] in GET /user/:id:", rows[0]);
                res.json({
                    success: true,
                    userId: userId,
                    rows: rows[0],
                });
            } else {
                console.log("user does not exist");
                res.json({
                    success: false,
                    errorMsg: "Server error: Could not find user details",
                });
            }
        })
        .catch((err) => {
            "err in GET /user with getPwByEmail()", err;
            res.json({
                success: false,
                errorMsg: "Server error: Could not find user details",
            });
        });

    // db.getImageById(id)
    //     .then(({ rows }) => {
    //         res.json(rows[0]);
    //     })
    //     .catch((err) => {
    //         console.log("error in GET /images with getImagesbyId()", err);
    //     });
});

app.post("/bio", (req, res) => {
    console.log("ACCESSED POST /bio route ");
    const { userId } = req.session;
    const { draftBio } = req.body;

    db.updateBio(draftBio, userId)
        .then(({ rows }) => {
            console.log("POST /bio response", rows[0].bio);
            res.json(rows[0].bio);
        })
        .catch((err) => {
            console.log("error in POST /bio with uploadProfilePic()", err);
            res.json({
                success: false,
                errorMsg: "Sever error: Unable to update bio succesfully",
            });
        });
});

//////////////////////////////////////// LOGGED OUT ROUTES ///////////////////////////////////////

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
                        console.log("err in POST /login compare", err);
                        //conditionally render error message: "Incorrect email and/or password"
                        // res.json({ success: false }); // confirm this should go here
                        //render login page again?
                    });
            })
            .catch((err) => {
                console.log("err in POST /login with getPwByEmail()", err);
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
                            let message = `Please navigate back to our site and use the code ${resetCode} to reset you password`;
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
    const { email, code, password } = req.body;

    if (code !== "" && password !== "") {
        db.getCodeByEmail(email)
            .then((response) => {
                if (response.rows[0].code == code) {
                    hash(password)
                        .then((hashedPw) => {
                            db.updatePassword(hashedPw, email)
                                .then(({ rows }) => {
                                    console.log(
                                        "rows in POST /reset/verify",
                                        rows
                                    );
                                    res.json({ success: true });
                                })
                                .catch((err) => {
                                    console.log(
                                        "error with updatePassword() in POST /reset/verify",
                                        err
                                    );
                                    // res.json({ error: true }); // confirm this should go here
                                });
                        })
                        .catch((err) => {
                            console.log(
                                "error with hashingPw() in POST /register",
                                err
                            );
                            // res.json({ error: true }); // confirm this should go here
                        });
                } else {
                    console.log(
                        "the code you entered does not match the one we emailed"
                    );
                    // res.json({ error: true }); // confirm this should go here
                }
            })
            .catch((err) => {
                console.log(
                    "error in POST /reset/verify with getCodeByEmail()/invalid code",
                    err
                );
            });
    } else {
        console.log("code and email fields must be populated");
    }

    // If the code in the database and the one in the request body are the same, hash the password and update the user's row in the users table
    // Send response indicating success or error

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
