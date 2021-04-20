import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
// Components
import Routes from "./routing/routes";
import { checkAuth } from "./actions/auth";

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;

/*
const dispatch = useDispatch()
 useEffect(() => {
    dispatch(checkAuth())
   }
 }, [])
*/
