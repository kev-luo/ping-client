import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { BiLogOut, BiInfoCircle, BiLogIn } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { withRouter } from "react-router-dom";

import { useAuthContext } from "../utils/useAuthContext";

function NavBurger({ open, setOpen, logout, history, darkMode }) {
  const classes = useStyles();
  const { user } = useAuthContext();
  const handleClick = (route) => {
    if (route === "logout") {
      logout();
    } else {
      history.push(`/${route}`);
    }
    setOpen(!open);
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(!open)}>
      <List className={clsx(classes.list, darkMode ? classes.textDark : "")}>
        <ListItem button onClick={() => handleClick("about")} className={clsx(classes.background, darkMode ? classes.colorDark : "")}>
          <ListItemIcon className={darkMode ? classes.colorDark : ""}>
            <BiInfoCircle />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        {user ? (
          <>
            <ListItem button onClick={() => handleClick("settings")} className={clsx(classes.background, darkMode ? classes.colorDark : "")}>
              <ListItemIcon className={darkMode ? classes.colorDark : ""}>
                <FiSettings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={() => handleClick("logout")} className={clsx(classes.deleteBg, darkMode ? classes.deleteColor : "")}>
              <ListItemIcon className={darkMode ? classes.deleteColor : ""}>
                <BiLogOut />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={() => handleClick("portal")} className={clsx(classes.background, darkMode ? classes.colorDark : "")}>
            <ListItemIcon className={darkMode ? classes.colorDark : ""}>
              <BiLogIn />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}

const useStyles = makeStyles(theme => ({
  list: {
    background: theme.palette.info.main,
    height: "100vh",
  },
  colorDark: {
    color: theme.palette.primary.main,
  },
  background: {
    "&:hover": {
      background: 'rgba(34, 204, 242, 0.1)',
    }
  },
  deleteColor: {
    color: theme.palette.error.main
  },
  deleteBg: {
    "&:hover": {
      background: 'rgba(191, 33, 62, 0.1)',
    }
  }
}))

export default withRouter(NavBurger);
