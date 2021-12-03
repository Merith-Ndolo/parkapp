import React from "react";
import { Typography, Divider } from "@material-ui/core";
import useStyles from "./style";

const LeftNavbar = ({ choosePage }) => {
  const classes = useStyles();

  const homePage = () => {
    choosePage("home");
  };

  const parkingPage = () => {
    choosePage("parking");
  };

  const clientsPage = () => {
    choosePage("clients");
  };

  return (
    <main className={classes.content} style={{ zIndex: "000" }}>
      <div className={classes.LeftNavbar}>
        <div className="logo">
          <title>Spotify</title>
        </div>
        <ul className={classes.ul}>
          <Typography style={{ textDecoration: "none" }}>
            <li className={classes.li} onClick={homePage}>
              Home
            </li>
          </Typography>
          <Divider />
          <Typography style={{ textDecoration: "none" }}>
            {" "}
            <li className={classes.li} onClick={parkingPage}>
              Parking
            </li>
          </Typography>
          <Divider />
          <Typography style={{ textDecoration: "none" }}>
            <li className={classes.li} onClick={clientsPage}>
              Clients
            </li>
          </Typography>
          <Divider />
          <br />
        </ul>
      </div>
    </main>
  );
};

export default LeftNavbar;
