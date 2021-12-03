import React from "react";
import useStyles from "./style";
import { useLocation } from "react-router-dom";

import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import { useSelector } from "react-redux";

const Filter = ({ stage, count, all_park_on_stage, filterPlaces }) => {
  const classes = useStyles();
  const userData = useSelector((state) => state.userReducer);
  const location = useLocation();

  return (
    <div className={classes.filter}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="stage">
              <EmojiTransportationIcon /> Rechercher une place libre (par étage)
            </InputLabel>
            <Select
              labelId="stage"
              id="demo-simple-select-autowidth"
              displayEmpty
              value={stage}
              onChange={filterPlaces}
              autoWidth
              label="Age"
            >
              <MenuItem value={0} default>
                Tous les étages
              </MenuItem>
              <MenuItem value={1}>Niveau 1</MenuItem>
              <MenuItem value={2}>Niveau 2</MenuItem>
              <MenuItem value={3}>Niveau 3</MenuItem>
              <MenuItem value={4}>Niveau 4</MenuItem>
              <MenuItem value={5}>Niveau 5</MenuItem>
              <MenuItem value={6}>Niveau 6</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom>
            {location.pathname !== "/dashboard" &&
              (count < 2
                ? `${count} Place libre /`
                : `${count} Places libres /`)}
            {all_park_on_stage}{" "}
            {all_park_on_stage < 2 ? "Place au total" : "Places au total"}
          </Typography>
        </Grid>
        {userData.role == "admin" && (
          <>
            <Grid item xs={6} sm={6}>
              <div
                style={{
                  backgroundColor: "#badc58",
                  borderRadius: "15px",
                  width: "10px",
                }}
              >
                <Typography variant="overline">Place Libre</Typography>
              </div>
            </Grid>
            <Grid item xs={6} sm={6}>
              <div
                style={{
                  backgroundColor: "#adadad",
                  borderRadius: "15px",
                  width: "10px",
                }}
              >
                <Typography variant="overline">Place occupée</Typography>
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Filter;
