import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlaces } from "../../actions/parkingAction";
import { isEmpty } from "../../utils/Utils";
import useStyles from "./style";
import MyParkCard from "./MyParkCard";

const MyPark = () => {
  const classes = useStyles();

  const [loadPark, setloadPark] = useState(true);
  const [count, setCount] = useState(10);
  const dispatch = useDispatch();
  const parksData = useSelector((state) => state.parkingReducer);
  const userData = useSelector((state) => state.userReducer);

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
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ display: "block", justifyContent: "center" }}>
        <ul>
          {!isEmpty(parksData[0]) &&
            parksData.map((park) => {
              return (
                !isEmpty(park.parkers[0]) &&
                park.parkers[0] === userData._id && (
                  <MyParkCard park={park} key={park._id} />
                )
              );
            })}
        </ul>
      </div>
    </main>
  );
};

export default MyPark;
