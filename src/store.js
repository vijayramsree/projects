import thunk from "redux-thunk";
import { applyMiddleware, createStore} from "redux";

//reducers
import reducers from "./reducers/weatherReducer"

//Middleware
const middleware = applyMiddleware(thunk);
//store
const store = createStore(reducers, middleware);

export default store; 