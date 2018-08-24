import { FETCH_POKEMON } from "../actions/types";
export default function(state = null, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_POKEMON:
      return action.payload || false;
    default:
      return state;
  }
}
