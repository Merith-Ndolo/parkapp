import React, { useContext } from "react";
import { Card, CardContent, Grid, Typography, Button } from "@material-ui/core";

import NumbersIcon from "@mui/icons-material/Numbers";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import TimerIcon from "@mui/icons-material/Timer";
import { UidContext } from "../UserIdConnect";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { isEmpty, timestampParserFr } from "../../utils/Utils";

const Storie = ({ park }) => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const parksData = useSelector((state) => state.parkingReducer);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Mon historique de Parking
        </Typography>
      </div>
      <ul>
        {!isEmpty(parksData[0]) &&
          parksData.map((park, index) => {
            return (
              !isEmpty(park.historique[0]) &&
              park.historique.map((storie, jex) => {
                if (storie.parkerId === userData._id) {
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
    </>
  );
};

export default Storie;
