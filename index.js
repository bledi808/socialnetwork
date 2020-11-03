const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
// const csurf = require("csurf");
const db = require("./db");
const { hash, compare } = require("./bc");

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

// app.use(csurf());
// app.use(function (req, res, next) {
//     res.locals.csrfToken = req.csrfToken();
//     res.set("x-frame-options", "DENY");
//     next();
// });

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
                                });
                        })
                        .catch((err) => {
                            console.log(
                                "error with hasingPw() in POST /register",
                                err
                            );
                        });
                } else {
                    console.log("email address is already being used");
                    //render registration page again
                }
            })
            .catch((err) => {
                console.log("error in /register with getPwByEmail()", err);
            });
    } else {
        console.log("all input fields must be populated");
        //render registration page again
    }
    //when everything works (i.e. hashing pw, inserting a row in users table and adding userId to req.session)
    // this will triigger console.log in the axios .then()
    // alternatively
    // res.json({ success: false });
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
