const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      validate: /^[a-zA-Z ]+$/,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    immatricule: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 30,
      validate: /^[A-Za-z0-9_-]*$/im,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1000,
      minlength: 8,
    },
    stories: {
      type: [String],
      required: true,
      validate: /^[A-Za-z0-9_-]*$/im,
    },
    role: {
      type: String,
    },
    isValidate: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

user_schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

user_schema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", user_schema);

module.exports = UserModel;
