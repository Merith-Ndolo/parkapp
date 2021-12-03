import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaces } from "../../actions/parkingAction";
import { isEmpty } from "../../utils/Utils";
import { UidContext } from "../UserIdConnect";
import ParkCardAdmin from "./ParkCardAdmin";

const ParkAdminList = ({ places }) => {
  const uid = useContext(UidContext);

  const [loadPark, setloadPark] = useState(true);
  const [count, setCount] = useState(10);
  const dispatch = useDispatch();
  const parksData = places;
  const all = useSelector((state) => state.parkingReducer);

  const tab = [];

  for (let i = 0; i < all.length; i++) {
    if (all[i].parkers.length > 0) {
      if (all[i].parkers[0] == uid) {
        tab.push(all[i].parkers[0]);
      }
    }
  }

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setloadPark(true);
    }
  };

  useEffect(() => {
    if (loadPark) {
      dispatch(getPlaces(count));
      setloadPark(false);
      setCount(count + 10);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPark, dispatch, count]);

  return (
    <div style={{ display: "block", justifyContent: "center" }}>
      <ul>
        {!isEmpty(parksData[0]) &&
          parksData.map((park) => {
            return (
              <ParkCardAdmin
                park={park}
                userexist={tab.toString()}
                key={park._id}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default ParkAdminList;
