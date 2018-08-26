import { FETCH_TYPE_EFFECTIVENESS } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TYPE_EFFECTIVENESS:
      return action.payload || false;
    default:
      return state;
  }
}
