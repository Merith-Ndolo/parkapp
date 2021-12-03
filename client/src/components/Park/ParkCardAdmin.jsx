import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Badge,
} from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import image from "../../assets/random-user.png";

import NumbersIcon from "@mui/icons-material/Numbers";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import TimerIcon from "@mui/icons-material/Timer";
import { useSelector } from "react-redux";
import axios from "axios";
import { isEmpty } from "../../utils/Utils";
import "react-toastify/dist/ReactToastify.css";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ParkCardAdmin = ({ park, userexist }) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  const [show, setShow] = useState(false);
  const [updateTime, setUpdateTime] = useState(park.occupationTime);
  const [updatePlaceNum, setUpdatePlaceNum] = useState("");

  let role = userData.role;

  const regex =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMOPQRSTUVWXYZ".split("");

  const handleShow = () => {
    setShow(true);
  };
  const handleCancel = () => {
    setShow(false);
  };

  console.log(userexist);

  const handleUpdate = (parkId) => {
    let list = updatePlaceNum.split("");
    const intersection = list.filter((element) => regex.includes(element));

    const immError = document.querySelector(".place.error");

    if (updatePlaceNum === "" || list.length !== intersection.length) {
      immError.innerHTML = "Numéro de place incorrect";
    } else {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/park/${parkId}`,
        withCredentials: true,
        data: {
          updatePlaceNum,
          updateTime,
          role,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            console.warn("error");
          } else {
            console.info("yes success");
            setShow(false);
            window.location.reload(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (parkId) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/park/${parkId}`,
      data: { role },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.warn("error");
        } else {
          console.info("yes success");
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card
        style={
          park.disponibility == false
            ? { backgroundColor: "#adadad" }
            : { backgroundColor: "#badc58" }
        }
      >
        <li key={park._id}>
          <br />
          {park.disponibility == false && (
            <Badge
              badgeContent={
                !isEmpty(usersData[0]) &&
                usersData.map((user) => {
                  if (
                    !isEmpty(park.parkers[0]) &&
                    park.parkers[0] == user._id
                  ) {
                    return user.name;
                  }
                })
              }
              color="error"
            >
              <Avatar alt={`Avatar n°${park._id}`} src={image} />
            </Badge>
          )}

          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={3}>
                <Typography>
                  <EmojiTransportationIcon /> Etage : {park.stage}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography>
                  <NumbersIcon /> Place : {park.placeNum}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography>
                  <TimerIcon /> Durée : {park.occupationTime}
                </Typography>
              </Grid>

              {!show && userData.role === "admin" && (
                <Grid item xs={12} sm={3}>
                  <Button color="primary" onClick={handleShow}>
                    <EditIcon />
                  </Button>
                  <Button
                    type="submit"
                    color="secondary"
                    onClick={(e) => {
                      if (
                        window.confirm(
                          `Etes-vous certains de supprimer la place ${park.placeNum} de l'étage ${park.stage}?`
                        )
                      ) {
                        handleDelete(park._id);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              )}
              {show && userData.role === "admin" && (
                <>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Place"
                      type="text"
                      onChange={(e) => setUpdatePlaceNum(e.target.value)}
                      value={updatePlaceNum}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <NumbersIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div
                      className="place error"
                      style={{ color: "#d9534f" }}
                    ></div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Durée"
                      type="time"
                      onChange={(e) => setUpdateTime(e.target.value)}
                      value={updateTime}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TimerIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div
                      className="time error"
                      style={{ color: "#d9534f" }}
                    ></div>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Button
                      type="submit"
                      color="primary"
                      onClick={(e) => handleUpdate(park._id)}
                    >
                      <SendIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Button
                      type="submit"
                      color="secondary"
                      onClick={handleCancel}
                    >
                      <CancelIcon />
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </li>
      </Card>
      <br />
    </>
  );
};

export default ParkCardAdmin;
