import React, { useState } from "react";

import {
  Typography,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import useStyles from "./style";

import NumbersIcon from "@mui/icons-material/Numbers";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import TimerIcon from "@mui/icons-material/Timer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const NewParkForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer);
  const parksData = useSelector((state) => state.parkingReducer);
  console.log(userData._id);
  console.log(parksData);

  const [num, setNum] = useState("");
  const [stage, setStage] = useState(1);
  const [occupTime, setOccupTime] = useState("");

  let role = userData.role;
  let userId = userData._id;

  const handleChange = (event) => {
    setStage(event.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/park/`,
      data: {
        num,
        stage,
        occupTime,
        role,
        userId,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.warn("yes error");
        } else {
          console.info("yes success");
          window.location = "/";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className={classes.toolbar} />
      <div style={{ display: "block", justifyContent: "center" }}>
        <br />
        <div style={{ zIndex: "999" }}>
          <Typography variant="h6" gutterBottom>
            Créer une place de Parking
          </Typography>
        </div>
        <br />
        <Card>
          <CardContent>
            <form action="" enctype="multipart/form-data">
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Numéro de place"
                    type="text"
                    onChange={(e) => setNum(e.target.value)}
                    value={num}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <NumbersIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className="num error" style={{ color: "#d9534f" }}></div>
                </Grid>
                <br />
                <br />
                <Grid item xs={12} sm={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="stage">
                      <EmojiTransportationIcon /> Etage
                    </InputLabel>
                    <Select
                      labelId="stage"
                      id="demo-simple-select-autowidth"
                      displayEmpty
                      value={stage}
                      onChange={handleChange}
                      autoWidth
                      label="Age"
                    >
                      <MenuItem value={1} default>
                        Niveau 1 (par défaut)
                      </MenuItem>
                      <MenuItem value={2}>Niveau 2</MenuItem>
                      <MenuItem value={3}>Niveau 3</MenuItem>
                      <MenuItem value={4}>Niveau 4</MenuItem>
                      <MenuItem value={5}>Niveau 5</MenuItem>
                      <MenuItem value={6}>Niveau 6</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <br />
                <br />
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Temps d'occupation"
                    onChange={(e) => setOccupTime(e.target.value)}
                    value={occupTime}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TimerIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div
                    className="occupTime error"
                    style={{ color: "#d9534f" }}
                  ></div>
                </Grid>
              </Grid>
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    onClick={handleRegister}
                    variant="contained"
                    color="primary"
                  >
                    Enregister
                  </Button>
                </Grid>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default NewParkForm;
