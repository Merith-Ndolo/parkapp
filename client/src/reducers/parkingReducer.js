import { GET_PLACES } from "../actions/parkingAction";

const initialState = {};

export default function parkingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLACES:
      return action.payload;
    default:
      return state;
  }
}
