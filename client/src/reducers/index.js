import { combineReducers } from "redux";
//import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import pokemonReducer from "./pokemonReducers";
import moveReducer from "./moveReducers";
import opponentMoveReducer from "./opponentMoveReducers";
import typeReducer from "./typeReducers";
import typeCollectionReducer from "./typeCollectionReducers";
export default combineReducers({
  auth: authReducer,
  pokemon: pokemonReducer,
  move: moveReducer,
  opponentMove: opponentMoveReducer,
  type: typeReducer,
  typeCollection: typeCollectionReducer
});
