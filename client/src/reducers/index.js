import { combineReducers } from "redux";
//import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import pokemonReducer from "./pokemonReducers";
import moveReducer from "./moveReducers";
import opponentMoveReducer from "./opponentMoveReducers";
export default combineReducers({
  auth: authReducer,
  pokemon: pokemonReducer,
  move: moveReducer,
  opponentMove: opponentMoveReducer
});
