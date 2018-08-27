import { FETCH_TYPE_COLLECTION } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TYPE_COLLECTION:
      return action.payload || false;
    default:
      return state;
  }
}
