import { combineReducers } from "redux";
//import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import pokemonReducer from "./pokemonReducers";
export default combineReducers({
  auth: authReducer,
  pokemon: pokemonReducer
});
