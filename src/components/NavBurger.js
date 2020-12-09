import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { BiExit, BiInfoCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { withRouter } from "react-router-dom";

import { useAuthContext } from "../utils/useAuthContext";

function NavBurger({ open, setOpen, logout, history }) {
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
      <List>
        <ListItem button onClick={() => handleClick("about")}>
          <ListItemIcon>
            <BiInfoCircle />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        {user ? (
          <>
            <ListItem button onClick={() => handleClick("settings")}>
              <ListItemIcon>
                <FiSettings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={() => handleClick("logout")}>
              <ListItemIcon>
                <BiExit />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}

export default withRouter(NavBurger);
