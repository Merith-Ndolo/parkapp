const mongoose = require("mongoose");

const conn = function connexion() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
};

const close = function disconnect() {
  return mongoose.disconnect();
};

module.exports = { conn, close };
