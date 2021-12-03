import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./style";
import { Link } from "react-router-dom";
import { UidContext } from "../UserIdConnect";
import Logout from "../Log/Logout";

const NavbarAdmin = () => {
  const classes = useStyles();

  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  console.log(uid);

  return (
    <AppBar position="fixed" className={classes.appBar} variant="contained">
      <Toolbar>
        <Typography variant="h6" className={classes.title} color="default">
          P.C Dashboard
        </Typography>
        <div className={classes.grow} />
        <Box
          sx={{
            display: "flex",
            mx: "auto",
            width: 300,
          }}
          className={classes.box}
        >
          <Typography component={Link} to="/dashboard" className={classes.link}>
            Dashboard
          </Typography>
          <Typography component={Link} to="/profil" className={classes.link}>
            {uid ? "Profil" : "Connexion"}
          </Typography>
          {uid && <Logout />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
