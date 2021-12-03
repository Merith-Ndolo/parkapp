import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./style";

const Logout = () => {
  const classes = useStyles();
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <Typography
      component={Link}
      to="/"
      variant="body1"
      color="inherit"
      className={classes.link}
      onClick={logout}
    >
      Déconnexion
    </Typography>
  );
};

export default Logout;
