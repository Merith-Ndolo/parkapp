import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty, shortDateParser, timestampParserFr } from "../../utils/Utils";
import useStyles from "./style";

import Avatar from "@mui/material/Avatar";
import { Card, CardContent, Grid, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import image from "../../assets/random-user.png";

import { Typography, Dialog, DialogTitle } from "@material-ui/core";

import NumbersIcon from "@mui/icons-material/Numbers";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import TimerIcon from "@mui/icons-material/Timer";
import axios from "axios";

function SimpleDialog(props) {
  const { onClose, open, user } = props;
  const parksData = useSelector((state) => state.parkingReducer);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
    >
      <DialogTitle id="simple-dialog-title">
        <Typography>HISTORIQUE</Typography>
      </DialogTitle>
      <ul>
        {!isEmpty(parksData[0]) &&
          parksData.map((park, index) => {
            return (
              !isEmpty(park.historique[0]) &&
              park.historique.map((storie, jex) => {
                if (storie.parkerId === user) {
                  return (
                    <>
                      <Card>
                        <li key={park._id}>
                          <CardContent>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={2}>
                                <Typography>
                                  <EmojiTransportationIcon /> Etage :{" "}
                                  {park.stage}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={2}>
                                <Typography>
                                  <NumbersIcon /> Place : {park.placeNum}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography color="secondary">
                                  <TimerIcon /> Durée : {park.occupationTime}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography color="primary">
                                  <TimerIcon /> Date :{" "}
                                  {timestampParserFr(storie.timestamp)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </li>
                      </Card>
                      <br />
                    </>
                  );
                }
              })
            );
          })}
      </ul>
    </Dialog>
  );
}

const UsersList = () => {
  const classes = useStyles();

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  let role = userData.role;

  const [user, setUser] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getStorie = (userId) => {
    setUser(userId);
    setOpen(true);
  };

  const handleDelete = (userId) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
      data: { role },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.warn("error");
        } else {
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
        <div style={{ zIndex: "999" }}>
          <Typography variant="h6" gutterBottom>
            Gestion des utilisateurs
          </Typography>
        </div>
        <br />
        <ul>
          {!isEmpty(usersData[0]) &&
            usersData.map((user, index) => {
              if (user.role !== "admin") {
                return (
                  <>
                    <Card>
                      <li key={user._id}>
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={2}>
                              <Avatar
                                alt={`Avatar n°${index + 1}`}
                                src={image}
                              />
                            </Grid>

                            <Grid item xs={12} sm={5}>
                              <span>
                                <Typography>Email : </Typography>
                                {user.email}
                              </span>
                            </Grid>

                            <Grid item xs={12} sm={2}>
                              <span>
                                <Typography>IMM :</Typography>{" "}
                                {user.immatricule}{" "}
                              </span>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                              <span>
                                <Typography>Création : </Typography>
                                {shortDateParser(user.createdAt)}
                              </span>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                              <Button
                                color="primary"
                                onClick={(e) => getStorie(user._id)}
                              >
                                <PreviewIcon />
                              </Button>
                              <Button
                                type="submit"
                                color="secondary"
                                onClick={(e) => {
                                  if (
                                    window.confirm(
                                      `Etes-vous certains de supprimer le client ${user.name} ?`
                                    )
                                  ) {
                                    handleDelete(user._id);
                                  }
                                }}
                              >
                                <DeleteIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </li>
                    </Card>
                    <br />
                  </>
                );
              }
            })}
        </ul>
      </div>
      <SimpleDialog open={open} onClose={handleClose} user={user} />
    </main>
  );
};

export default UsersList;
