import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  IconButton,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { BiMenu, BiInfoCircle, BiLogOut, BiLogIn } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSpring, animated as a } from "react-spring";

import NavBurger from "./NavBurger";
import StyledNav from "./Styled/StyledNav";
import Actions from "../utils/dashboardActions";
import { useAuthContext } from "../utils/useAuthContext";
import { useMapContext } from "../utils/useMapContext";
import { useDashboardContext } from "../utils/useDashboardContext";

export default function Nav({ darkMode, setDarkMode }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const context = useAuthContext();
  const {
    state: { userPosition },
    dispatch: mapDispatch,
  } = useMapContext();
  const { dispatch } = useDashboardContext();
  const props = useSpring({
    to: { opacity: 1, transform: "translate(0px)" },
    from: { opacity: 0, transform: "translate(-40rem)" },
    config: {
      velocity: 100,
      tension: 500,
    },
  });

  const logoutOps = () => {
    dispatch({ type: Actions.CLEAR_USER });
    context.logout();
  };

  return (
    <StyledNav className={classes.nav}>
      {/* <img src="../assets/node.svg" alt="ping logo" /> */}
      <a.div style={props}>
        <Typography variant="overline" className="logo">
          <Link to={context.user ? "/feed/all" : "/"} className={classes.link}>
            Ping
          </Link>
        </Typography>
      </a.div>
      <div className="nav">
        <FormControlLabel
          className={classes.toggle}
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          }
          label={darkMode ? "☀️" : "🌙"}
          labelPlacement="start"
        />
        <Link to={`/about`} className={clsx(classes.link, classes.navItem)}>
          <Button color="secondary" endIcon={<BiInfoCircle />}>
            About
          </Button>
        </Link>
        {context.user ? (
          <>
            <Link
              to={`/settings`}
              className={clsx(classes.link, classes.navItem)}
            >
              <Button color="secondary" endIcon={<FiSettings />}>
                Settings
              </Button>
            </Link>
            <Button
              color="secondary"
              endIcon={<BiLogOut />}
              onClick={logoutOps}
              className={classes.navItem}
            >
              Logout
            </Button>
          </>
        ) : (
          <Link to="/portal" className={clsx(classes.link, classes.navItem)}>
            <Button
              endIcon={<BiLogIn />}
              color="secondary"
            >
              Login
            </Button>
          </Link>
        )}
        <IconButton className={classes.burger} onClick={() => setOpen(!open)}>
          <BiMenu />
        </IconButton>
      </div>
      <NavBurger
        open={open}
        setOpen={setOpen}
        logout={logoutOps}
        darkMode={darkMode}
      />
    </StyledNav>
  );
}

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.info.light,
  },
  link: {
    color: theme.palette.secondary.main,
  },
  toggle: {
    marginRight: ".1rem",
  },
  navItem: {
    margin: ".5rem",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  burger: {
    display: "none",
    "@media (max-width: 600px)": {
      display: "inline-block",
    },
  },
}));
