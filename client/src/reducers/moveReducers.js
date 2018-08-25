import { FETCH_MOVE } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_MOVE:
      return action.payload || false;
    default:
      return state;
  }
}
