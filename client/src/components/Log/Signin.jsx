import React, { useState } from "react";
import axios from "axios";
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
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link } from "react-router-dom";

const Signin = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const roleError = document.querySelector(".role.error");
    const validationError = document.querySelector(".validation.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
          roleError.innerHTML = res.data.errors.role;
          validationError.innerHTML = res.data.errors.validation;
          console.warn("error");
        } else {
          window.location = "/";
          console.info("yes success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ display: "block", justifyContent: "center" }}>
        <Typography variant="h6" gutterBottom>
          Connexion
        </Typography>
        <br />
        <Card>
          <CardContent>
            <form onSubmit={handleLogin}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div
                    className="email error"
                    style={{ color: "#d9534f" }}
                  ></div>
                  <div
                    className="role error"
                    style={{ color: "#d9534f" }}
                  ></div>
                  <div
                    className="validation error"
                    style={{ color: "#d9534f" }}
                  ></div>
                </Grid>
                <Grid item xs={12} sm={12}>
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
              </Grid>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item xs={12} sm={6}>
                  <Button type="submit" variant="contained" color="primary">
                    Envoyer
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <p style={{ textAlign: "end" }}>
                    <Typography
                      component={Link}
                      to="/register"
                      variant="body1"
                      color="inherit"
                    >
                      <span>je créé mon compte</span>
                    </Typography>
                  </p>
                </Grid>{" "}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Signin;
