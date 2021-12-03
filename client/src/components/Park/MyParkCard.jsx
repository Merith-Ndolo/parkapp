import React, { useContext } from "react";
import { Card, CardContent, Grid, Typography, Button } from "@material-ui/core";

import NumbersIcon from "@mui/icons-material/Numbers";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import TimerIcon from "@mui/icons-material/Timer";
import { UidContext } from "../UserIdConnect";
import { useSelector } from "react-redux";
import axios from "axios";
import { timestampParser } from "../../utils/Utils";
import { useLocation } from "react-router-dom";

const MyParkCard = ({ park }) => {
  const userData = useSelector((state) => state.userReducer);

  let placeId = park._id;
  let userId = park.parkers[0];

  const decompteur = (time) => {
    const myDate = timestampParser(time);
    console.log(myDate);

    const countDownDate = new Date(myDate).getTime();
    const x = setInterval(function () {
      let now = new Date().getTime();
      let distance = countDownDate - now;

      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("launch").innerHTML =
        minutes + "m " + seconds + "s";

      if (distance < 0) {
        clearInterval(x);
        handleLeave();
      }
    }, 1000);

    return <Typography id="launch"></Typography>;
  };

  const handleLeave = async () => {
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/park/leave/${placeId}`,
      data: {
        userId,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.warn("yes error");
        } else {
          console.info("yes success");
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.reload(true);
      });
  };

  if (Date.now() >= park.startTime) {
    handleLeave();
  }

  return (
    <>
      <Typography variant="h5">Mon emplacement actuel</Typography>
      <br />
      <Card>
        <li key={park._id}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={4}>
                <Typography>
                  <EmojiTransportationIcon /> Etage : {park.stage}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  <NumbersIcon /> Place : {park.placeNum}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography color="secondary">
                  <TimerIcon /> Durée : {park.occupationTime}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={4}>
                {decompteur(park.startTime)}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  onClick={handleLeave}
                  variant="contained"
                  color="primary"
                >
                  Je pars
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </li>
      </Card>
      <br />
    </>
  );
};

export default MyParkCard;
