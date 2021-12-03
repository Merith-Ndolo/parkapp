const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: "./config/.env" });
const db = require("./config/db");
db.conn();

const { checkUser, requireAuth } = require("./middleware/middleware");

//My routes
const userRoutes = require("./routes/user_route");
const parkingRoutes = require("./routes/parking_route");

const app = express();

//cors restrictions
const cors_options = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: "POST,DELETE,GET,HEAD,PUT,PATCH",
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  preflightContinue: false,
};

app.use(cors(cors_options));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res, next) => {
  res.status(200).send(res.locals.user._id);
  next();
});

//Routes access
app.use("/api/user", userRoutes);
app.use("/api/park", parkingRoutes);

// use static files
app.use(
  express.static("public", {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp("\\.[0-9a-f]{8}\\.");
      if (path.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      } else if (hashRegExp.test(path)) {
        res.setHeader("Cache-Control", "max-age=31536000");
      }
    },
  })
);

//heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}`);
});

module.exports = app;
