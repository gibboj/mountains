
import './css/App.css';

import Resume from "./components/resume";
import Header from "./components/header"
import Home from "./components/home"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Scene from './components/scene';

function App() {
  return (
    <Router>
      <div className="bg-blue-100 h-screen grid grid-rows-layout">
        <Header />
        <Switch>
          <Route path="/climbing">
            <Climbing />
          </Route>
          <Route path="/resume">
            <Resume />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Scene />
      </div>
    </Router >
  );
}

function Climbing() {
  return <h2>Climbing</h2>;
}


export default App;
