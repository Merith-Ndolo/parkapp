import axios from "axios";

export const GET_PLACES = "GET_PLACES";
export const GET_ALL_PLACES = "GET_ALL_PLACES";

export const getPlaces = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/park/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_PLACES, payload: array });
        dispatch({ type: GET_ALL_PLACES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
