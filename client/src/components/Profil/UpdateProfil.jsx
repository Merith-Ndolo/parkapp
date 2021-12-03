import React, { useState } from "react";
import useStyles from "./style";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import image from "../../assets/random-user.png";
import { shortDateParser } from "../../utils/Utils";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const UpdateProfil = () => {
  const classes = useStyles();
  const userData = useSelector((state) => state.userReducer);

  const [show, setShow] = useState(false);
  const [updateImm, setUpdateImm] = useState("");
  let userId = userData._id;
  let role = userData.role;
  const regex =
    "abcdefghijklmnopqrstuvwxyz-_0123456789ABCDEFGHIJKLMOPQRSTUVWXYZ".split("");

  const handleShow = () => {
    setShow(true);
  };
  const handleCancel = () => {
    setShow(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let list = updateImm.split("");
    const intersection = list.filter((element) => regex.includes(element));

    const immError = document.querySelector(".immatricule.error");

    if (updateImm === "" || list.length !== intersection.length) {
      immError.innerHTML = "Numéro d'immatriculation incorrect";
    } else {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
        withCredentials: true,
        data: {
          updateImm,
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

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ display: "block", justifyContent: "center" }}>
        <Card>
          <CardContent>
            <Typography variant="h6">{userData.name}</Typography>
            <h3>({userData.role === "user" ? "Client" : "Administrateur"})</h3>
            <Typography>
              Compte créé le : {shortDateParser(userData.createdAt)}
            </Typography>
            <Typography variant="subtitle1">
              E-mail:
              <span style={{ color: "#d9534f" }}> {userData.email} </span>
            </Typography>
            {userData.role === "user" && (
              <Typography variant="subtitle1">
                Numéro d'immatriculation :{" "}
                <span style={{ color: "#d9534f" }}>{userData.immatricule}</span>
              </Typography>
            )}
            <br />
            <div className="row">
              <div className="col-12">
                <div className="left-part">
                  <img
                    width="100%"
                    style={{
                      borderRadius: "50%",
                    }}
                    src={image}
                    alt="user-pic"
                  />
                </div>
              </div>
            </div>
            {!show && userData.role === "user" && (
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShow}
                >
                  Mettre à jour
                </Button>
              </Grid>
            )}
            {show && userData.role === "user" && (
              <Grid container spacing={3}>
                <Grid item xs={8} sm={8}>
                  <TextField
                    fullWidth
                    label="Nouveau numéro d'immatricule"
                    type="text"
                    onChange={(e) => setUpdateImm(e.target.value)}
                    value={updateImm}
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
                <Grid item xs={2} sm={2}>
                  <Button type="submit" color="primary" onClick={handleUpdate}>
                    <SendIcon />
                  </Button>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Button
                    type="submit"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    <CancelIcon />
                  </Button>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default UpdateProfil;
