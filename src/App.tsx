import "./css/App.css";
import { RecoilRoot } from "recoil";
import Resume from "./components/UI/resume";
import Header from "./components/UI/header";
import Home from "./components/UI/home";
import Drawer from "./components/UI/Drawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Scene from "./components/scene";
import theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
