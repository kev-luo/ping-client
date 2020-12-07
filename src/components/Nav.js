import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";

import StyledNav from "./Styled/StyledNav";
import Actions from "../utils/dashboardActions";
import { useAuthContext } from "../utils/useAuthContext";
import { useMapContext } from "../utils/useMapContext";
import { useDashboardContext } from "../utils/useDashboardContext";

export default function Nav({ darkMode, setDarkMode }) {
  const classes = useStyles();
  const context = useAuthContext();
  const {
    state: { userPosition },
    dispatch: mapDispatch,
  } = useMapContext();
  const { dispatch } = useDashboardContext();

  const logoutOps = () => {
    dispatch({ type: Actions.CLEAR_USER });
    context.logout();
  };

  const userProfile = () => {
    dispatch({ type: Actions.SELECT_USER, payload: context.user });
    mapDispatch({
      type: "UPDATE_VIEWPORT",
      payload: {
        latitude: userPosition?.latitude,
        longitude: userPosition?.longitude,
        zoom: 13,
      },
    });
  };

  return (
    <StyledNav>
      {/* <img src="../assets/node.svg" alt="ping logo" /> */}
      <Typography variant="overline" className="logo">
        <Link to={context.user ? "/feed/all" : "/"} className={classes.link}>
          Ping
        </Link>
      </Typography>
      <div className="nav">
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          }
          label={darkMode ? "☀️" : "🌙"}
          labelPlacement="start"
        />
        {!context.user && (
          <Link to="/portal" className={classes.link}>
            <Button variant="outlined" color="secondary" size="small">
              Login
            </Button>
          </Link>
        )}
        {context.user && (
          <>
            <Link to={`/user/${context.user.id}`} className={classes.link}>
              <Button
                onClick={userProfile}
                variant="outlined"
                color="secondary"
                size="small"
              >
                Settings
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<BiExit />}
              size="small"
              onClick={logoutOps}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </StyledNav>
  );
}

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    flexGrow: 1,
    fontSize: "2rem",
    padding: "0 2px",
    margin: "0 0",
  },
  link: {
    color: "#659DBD",
    textDecoration: "none",
    margin: theme.spacing(1),
  },
}));
