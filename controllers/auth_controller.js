const UserModel = require("../models/user_model");
const {
  signUpErrors,
  signInErrors,
  resetErrors,
  forgotErrors,
  roleErrors,
  validationErrors,
  signInAdminErrors,
} = require("../utils/errors_utils");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";
const OAuth2 = google.auth.OAuth2;

//token time
const temps_de_token = 2 * 24 * 60 * 60 * 1000;

const creation_token = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: temps_de_token,
  });
};

// Create user
module.exports.signUp = async (req, res) => {
  const { name, email, immatricule, password } = req.body;
  const isValidate = false;
  const role = "user";

  try {
    const user = await UserModel.create({
      name,
      email,
      immatricule,
      password,
      role,
      isValidate,
    });
    res.status(201).json({ user: user._id });

    const oauth2Client = new OAuth2(
      "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
      "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
      "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token:
        "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
    });
    const accessToken = oauth2Client.getAccessToken();

    const token = jwt.sign(
      { name, email, immatricule, password, role },
      JWT_KEY,
      {
        expiresIn: "30m",
      }
    );

    const CLIENT_URL = "http://" + req.headers.host;

    const output = `
      <h2>Cliquez sur le lien pour valider votre inscription</h2>
      <p>${CLIENT_URL}/api/user/activate/${token}</p>
      <p><b>NOTE: </b> Le lien ci-dessus expire dans 30 minutes.</p>
      `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "nodejsa@gmail.com",
        clientId:
          "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
        clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
        refreshToken:
          "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
        accessToken: accessToken,
      },
    });

    // send mail with defined transport object
    const mailOptions = {
      from: '"Parkmanager Corp" <nodejsa@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Mail de confirmation: service d'authentifation ✔", // Subject line
      generateTextFromHTML: true,
      html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.redirect("/login");
      } else {
        console.log("Mail sent : %s", info.response);
        res.redirect("/login");
        res.reload = true;
      }
    });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.activateHandle = (req, res) => {
  const token = req.params.token;
  let redirectUrl = process.env.REDIRECT_URL;
  if (token) {
    jwt.verify(token, JWT_KEY, (err, decodedToken) => {
      if (err) {
        res.redirect("/");
      } else {
        const { email } = decodedToken;
        UserModel.findOne({ email: email }).then((user) => {
          if (user.isValidate) {
            //------------ User already exists ------------//
            res.redirect(redirectUrl);
          } else {
            const updatedRecord = {
              isValidate: true,
            };

            UserModel.findByIdAndUpdate(
              user._id,
              { $set: updatedRecord },
              { new: true },
              (err, docs) => {
                if (!err) res.redirect(redirectUrl);
                else console.log("Update error : " + err);
              }
            );
          }
        });
      }
    });
  } else {
    console.log("Account activation error!");
  }
};

// User sign In
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    if (user.isValidate === false) {
      const errors = validationErrors(user);
      res.status(200).json({ errors });
    } else {
      const token = creation_token(user._id);
      res.cookie("jwt", token, { httpOnly: true, temps_de_token });
      res.status(200).json({ user: user._id });
      res.reload = true;
    }
  } catch (err) {
    const errors = signInErrors(err);
    console.log(err);
    res.status(200).json({ errors });
  }
};

//Admin sign In
module.exports.signInAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    if (user.role !== "admin") {
      const errors = signInAdminErrors(err);
      res.status(200).json({ errors });
    } else {
      const token = creation_token(user._id);
      res.cookie("jwt", token, { httpOnly: true, temps_de_token });
      res.status(200).json({ user: user._id });
      res.reload = true;
    }
  } catch (err) {
    const errors = signInAdminErrors(err);
    res.status(200).json({ errors });
  }
};

//Sign Out
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { temps_de_token: 1 });
  res.redirect("/");
  res.reload = true;
};

//Forgot Password
module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  let errors = [];

  try {
    const user = await UserModel.findOne({ email: email });
    res.status(200).json({ user: user._id });

    const oauth2Client = new OAuth2(
      "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
      "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
      "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token:
        "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
    });
    const accessToken = oauth2Client.getAccessToken();

    const token = jwt.sign({ _id: user._id }, JWT_RESET_KEY, {
      expiresIn: "30m",
    });
    const CLIENT_URL = "http://" + req.headers.host;
    const output = `
                <h2>Cliquez sur le lien pour réinitialiser votre mot de passe</h2>
                <p>${CLIENT_URL}/api/user/forgot/${token}</p>
                <p><b>NOTE: </b> Ce lien expire dans 30 minutes.</p>
                `;

    UserModel.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        errors.push({ msg: "Error resetting password!" });
      } else {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "nodejsa@gmail.com",
            clientId:
              "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
            clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
            refreshToken:
              "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
            accessToken: accessToken,
          },
        });

        // send mail with defined transport object
        const mailOptions = {
          from: '"Parkmanager Corp" <nodejsa@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Réinitialisation du mot de passe ✔", // Subject line
          html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            //res.redirect("/api/user/forgot");
          } else {
            console.log("Mail sent : %s", info.response);
            res.redirect("/");
            res.reload = true;
          }
        });
      }
    });
  } catch (err) {
    const errors = forgotErrors(err);
    res.status(200).json({ errors });
  }
};

//Redirect to Reset
exports.gotoReset = (req, res) => {
  const { token } = req.params;
  let redirectUrl = process.env.REDIRECT_URL;

  if (token) {
    jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
      if (err) {
        res.redirect(redirectUrl);
      } else {
        const { _id } = decodedToken;
        UserModel.findById(_id, (err, user) => {
          if (err) {
            res.redirect(redirectUrl);
          } else {
            res.redirect(`${process.env.CLIENT_URL}/reset/${_id}`);
          }
        });
      }
    });
  } else {
    console.log("Password reset error!");
  }
};

exports.resetPassword = async (req, res) => {
  var { password } = req.body;
  const id = req.params.id;

  try {
    await UserModel.findByIdAndUpdate(
      { _id: id },
      { password },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (err) {
          console.log(err);
          res.redirect(`${process.env.CLIENT_URL}/reset/${id}`);
        } else {
          docs.save();
          console.log("yes");

          res.header(
            "Cache-Control",
            "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
          );
          res.reload = true;
          res.redirect("/");
        }
      }
    );
  } catch (err) {
    const errors = resetErrors(err);
    res.status(200).json({ errors });
  }
};
