import "./css/App.css";
import { RecoilRoot } from "recoil";
import Resume from "./components/resume";
import Header from "./components/header";
import Home from "./components/home";
import Drawer from "./components/Drawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Scene from "./components/scene";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="bg-blue-100 min-h-screen grid grid-rows-layout">
          <Header />
          <Drawer />
          <Switch>
            <Route path="/resume">
              <Resume />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Scene />
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
