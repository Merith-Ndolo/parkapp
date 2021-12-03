import React, { useContext } from "react";
import { Card, CardContent, Grid, Typography, Button } from "@material-ui/core";

import NumbersIcon from "@mui/icons-material/Numbers";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import TimerIcon from "@mui/icons-material/Timer";
import { UidContext } from "../UserIdConnect";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { isEmpty } from "../../utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ParkCard = ({ park, userexist }) => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  console.log(userexist);

  let placeId = park._id;
  let role = userData.role;
  let userId = userData._id;

  let time = park.occupationTime;
  let mySeconds = time.split(":");
  let minTosec = mySeconds[0] * 60;
  let allToSecond = parseInt(minTosec) + parseInt(mySeconds[1]);

  let t = new Date();

  let breackTime = t.setSeconds(t.getSeconds() + allToSecond);

  const notify = () => {
    toast.info("Veuillez d'abord quitter votre emplacement actuel", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifyAdmin = () => {
    toast.warn(
      "Vous utilisez actuellement votre compte admin, veuillez vous connecter avec votre compte client !",
      {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handlePark = async () => {
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/park/garer/${placeId}`,
      data: {
        role,
        userId,
        breackTime,
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
  return (
    <>
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
                <Typography>
                  <TimerIcon /> Durée : {park.occupationTime}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                {park.disponibility === true ? (
                  <>
                    {uid && uid !== userexist && userData.role === "user" && (
                      <Button
                        onClick={handlePark}
                        variant="contained"
                        color="secondary"
                      >
                        Je me gars
                      </Button>
                    )}

                    {uid && uid !== userexist && userData.role === "admin" && (
                      <>
                        <Button
                          onClick={notifyAdmin}
                          variant="contained"
                          color="default"
                        >
                          Je me gars
                        </Button>
                        <ToastContainer
                          position="top-right"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                        />
                        <ToastContainer />
                      </>
                    )}

                    {uid && uid === userexist && (
                      <>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={notify}
                        >
                          Je change de place
                        </Button>
                        <ToastContainer
                          position="top-right"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                        />
                        <ToastContainer />
                      </>
                    )}

                    {!uid && (
                      <Button
                        component={Link}
                        to="/profil"
                        variant="contained"
                        color="secondary"
                      >
                        Je me gare
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    {!isEmpty(park.parkers[0]) && uid === park.parkers[0] && (
                      <div>Mon emplacement actuel</div>
                    )}
                    {!isEmpty(park.parkers[0]) && uid !== park.parkers[0] && (
                      <>
                        <Button variant="contained" color="default">
                          Occupée
                        </Button>
                      </>
                    )}
                    {isEmpty(park.parkers[0]) && (
                      <>
                        <Button variant="contained" color="default">
                          Occupée
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </li>
      </Card>
      <br />
    </>
  );
};

export default ParkCard;
