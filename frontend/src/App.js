
import './App.css';
import Dashboard from "./Components/Dashboard/Dashboard"
import {Switch, Link, Route } from "react-router-dom";
import {Login} from "./Components/Login/Login"
import {Csv} from "./Components/csv/csv";

function App() {
  return (
    <div className="App">
      {/* <Csv /> */}

      <Switch>
        <Route exact path = "/">
          <Login />
        </Route>
        <Route path = "/dashboard">
          <Dashboard />
        </Route>
      </Switch>
      
     
    </div>
  );
}

export default App;
