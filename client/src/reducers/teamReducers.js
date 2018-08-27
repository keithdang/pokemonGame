import { FETCH_TEAM } from "../actions/types";
export default function(state = null, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_TEAM:
      return action.payload || false;
    default:
      return state;
  }
}
