import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { BiExit } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

import { useAuthContext } from "../utils/useAuthContext";

export default function NavBurger({ open, setOpen }) {
  const { user } = useAuthContext();
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(!open)}>
      <List>
        {user ? (
          <>
            <ListItem button>
              <ListItemIcon>
                <FiSettings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button>
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
