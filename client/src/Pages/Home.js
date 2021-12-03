import React, { useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import MyPark from "../components/Park/MyPark";
import ParkList from "../components/Park/ParksList";
import { isEmpty } from "../utils/Utils";

const Home = () => {
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
      <MyPark />
      <Filter
        stage={stage}
        all_park_on_stage={
          isEmpty(all) ? (stage == 0 ? allLength : 0) : all.length
        }
        count={isEmpty(places) ? (stage == 0 ? dispoLength : 0) : places.length}
        filterPlaces={filterPlaces}
      />
      <ParkList places={allStages} />
    </div>
  );
};

export default Home;
