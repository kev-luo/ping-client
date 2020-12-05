import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Portal from "./pages/Portal";
import MapView from "./pages/MapView";
import UserSettings from "./pages/UserSettings";
import SinglePing from "./pages/SinglePing";
import ProtectedRoute from "./utils/ProtectedRoute";
import { MapProvider } from "./utils/useMapContext";
import { AuthProvider } from "./utils/useAuthContext";
import { DashboardProvider } from "./utils/useDashboardContext";
import { withTheme } from "./themes/withTheme";

function App(props) {
  const { darkMode, setDarkMode } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AuthProvider>
        <MapProvider>
          <DashboardProvider>
            <Router>
              <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route exact path="/portal">
                  <Portal />
                </Route>
                <Route exact path="/map">
                  <MapView />
                </Route>
                <ProtectedRoute path="/user/:feedType" component={Dashboard} />
                <ProtectedRoute
                  exact
                  path="/settings"
                  component={UserSettings}
                />
                <ProtectedRoute
                  exact
                  path="/ping/:pingId"
                  component={SinglePing}
                />
              </Switch>
            </Router>
          </DashboardProvider>
        </MapProvider>
      </AuthProvider>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.info.main,
    minHeight: "100vh",
  },
}));

export default withTheme(App);
