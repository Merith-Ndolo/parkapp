import React, { useState } from "react";
import LeftNavbar from "../components/Navbar/LeftNavbar";
import NewParkForm from "../components/Park/NewParkForm";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import { isEmpty } from "../utils/Utils";
import ParkAdminList from "../components/Park/ParkAdminList";
import UsersList from "../components/Users/UsersList";

const Dashboard = () => {
  const [page, setPage] = useState("home");

  function choosePage(page) {
    setPage(page);
    console.log(page);
  }

  const parksData = useSelector((state) => state.parkingReducer);

  const [places, setPlaces] = useState(parksData);
  const [stage, setStage] = useState(0);
  const [all, setAll] = useState(parksData);

  let allStages = parksData;

  const table = [];
  const table2 = [];

  for (let i = 0; i < parksData.length; i++) {
    if (parksData[i].disponibility === true) {
      table.push(parksData[i]);
    }
  }

  for (let i = 0; i < parksData.length; i++) {
    if (parksData[i]) {
      table2.push(parksData[i]);
    }
  }

  console.log(table);

  let dispoLength = table.length;
  let allLength = table2.length;

  const filterPlaces = (e) => {
    console.log(e.target.value);

    if (e.target.value === 0) {
      setPlaces(table);
      setAll(parksData);
      setStage(e.target.value);
    } else {
      setStage(e.target.value);
      setPlaces(
        parksData.filter((park, index) => {
          if (park.disponibility === true) {
            return park.stage.indexOf(e.target.value) >= 0;
          }
        })
      );
      setAll(
        parksData.filter((park, index) => {
          if (park.stage == e.target.value) {
            return park.stage.indexOf(e.target.value) >= 0;
          }
        })
      );
    }
  };

  if (!isEmpty(places)) {
    allStages = places;
  } else {
    console.log(places);
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <LeftNavbar choosePage={choosePage} />
        </Grid>
        <Grid item xs={9} sm={9}>
          {page == "home" && <NewParkForm />}
          {page == "parking" && (
            <>
              <br />
              <br />
              <Filter
                stage={stage}
                all_park_on_stage={all.length}
                count={
                  isEmpty(places)
                    ? stage == 0
                      ? dispoLength
                      : 0
                    : places.length
                }
                filterPlaces={filterPlaces}
              />
              <ParkAdminList places={allStages} />
            </>
          )}
          {page == "clients" && <UsersList />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
