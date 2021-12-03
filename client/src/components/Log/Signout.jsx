import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Recaptcha from "react-recaptcha";

import {
  Typography,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  InputAdornment,
} from "@material-ui/core";
import useStyles from "./style";

//Icons
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EmailIcon from "@mui/icons-material/Email";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Signout = () => {
  const classes = useStyles();

  const [formSubmit, setFormSubmit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [immatricule, setImmatricule] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [verify, setVerify] = useState(false);

  const verifyCallback = () => {
    setVerify(true);
  };

  const recaptchaLoaded = () => {
    console.log("reussi");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const nameError = document.querySelector(".name.error");
    const immError = document.querySelector(".immatricule.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");
    const recaptchaError = document.querySelector(".recap.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    recaptchaError.innerHTML = "";

    if (password !== controlPassword || !terms.checked || !verify) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";

      if (!verify)
        recaptchaError.innerHTML =
          "Veuillez confirmer que vous n'êtes pas une IA";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          name,
          email,
          immatricule,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            console.warn("yes error");
            nameError.innerHTML = res.data.errors.name;
            immError.innerHTML = res.data.errors.immatricule;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
            console.info("yes success");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ display: "block", justifyContent: "center" }}>
        <Typography variant="h6" gutterBottom>
          Creation de compte
        </Typography>
        <br />
        {formSubmit ? (
          <>
            <p>
              {" "}
              Veuillez consulter votre boite mail, un mail de confirmation vous
              a été envoyé!
            </p>
          </>
        ) : (
          <Card>
            <CardContent>
              <form onSubmit={handleRegister} encType="multipart/form-data">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Nom et Prénom"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div
                      className="name error"
                      style={{ color: "#d9534f" }}
                    ></div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div
                      className="email error"
                      style={{ color: "#d9534f" }}
                    ></div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Numéro d'immatricule"
                      type="text"
                      onChange={(e) => setImmatricule(e.target.value)}
                      value={immatricule}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DirectionsCarIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div
                      className="immatricule error"
                      style={{ color: "#d9534f" }}
                    ></div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Mot de passe"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div
                      className="password error"
                      style={{ color: "#d9534f" }}
                    ></div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirmation de mot de passe"
                      onChange={(e) => setControlPassword(e.target.value)}
                      value={controlPassword}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div
                      className="password-confirm error"
                      style={{ color: "#d9534f" }}
                    ></div>
                  </Grid>
                </Grid>
                <br />
                <Recaptcha
                  required
                  sitekey="6Le2EYkaAAAAADc5n5rxwdOfQ9NnAEFIbwQJEajb"
                  render="explicit"
                  verifyCallback={verifyCallback}
                  onloadCallback={recaptchaLoaded}
                />
                <div className="recap error" style={{ color: "#d9534f" }}></div>
                <br />
                <p>
                  <label>
                    <input type="checkbox" id="terms" defaultChecked />
                    <span style={{ color: "#000", fontWeight: "bold" }}>
                      {"  "} En créant un compte, vous acceptez nos{" "}
                      <Typography
                        component={Link}
                        to="/conditions"
                        variant="subtitle1"
                        color="inherit"
                      >
                        condtions générales d'utilisations
                      </Typography>
                    </span>
                  </label>
                </p>
                <div className="terms error" style={{ color: "#d9534f" }}></div>
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item xs={12} sm={6}>
                    <Button type="submit" variant="contained" color="primary">
                      Envoyer
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <p style={{ textAlign: "end" }}>
                      J'ai déjà un compte!{" "}
                      <Typography
                        component={Link}
                        to="/profil"
                        variant="body1"
                        color="inherit"
                      >
                        <span>Se connecter</span>
                      </Typography>
                    </p>
                  </Grid>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default Signout;
