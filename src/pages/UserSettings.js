import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { FiImage } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import StyledContainer from "../components/Styled/StyledContainer";
import { FETCH_USER_QUERY } from "../utils/graphql";
import { useAuthContext } from "../utils/useAuthContext";
import UserSettingsModal from "../components/User/U_Settings/UserSettingsModal";

export default function UserSettings({ darkMode }) {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [userSettings, setUserSettings] = useState("");

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: user?.id },
  });

  function handleClick(setting) {
    setIsOpen(!isOpen);
    setUserSettings(setting);
  }

  const userProfile = data?.getUser?.imageUrl ? (
    <Avatar
      src={data.getUser.imageUrl}
      alt={data.getUser.username}
      className={classes.media}
    />
  ) : (
    <Avatar className={classes.missingPic} />
  );

  return (
    <StyledContainer>
      {userProfile}
      <MenuList className={clsx(darkMode ? classes.menuDark : classes.menu)}>
        <MenuItem className={classes.item} onClick={() => history.goBack()}>
          <ListItemIcon>
            <TiArrowBackOutline
              className={clsx(darkMode ? classes.textDark : classes.text)}
            />
          </ListItemIcon>
          <ListItemText
            className={clsx(darkMode ? classes.textDark : classes.text)}
            primary="Go Back"
          />
        </MenuItem>
        <MenuItem className={classes.item} onClick={() => handleClick("Update Avatar")}>
          <ListItemIcon>
            <FiImage
              className={clsx(darkMode ? classes.textDark : classes.text)}
            />
          </ListItemIcon>
          <ListItemText
            className={clsx(darkMode ? classes.textDark : classes.text)}
            primary="Update Avatar"
          />
        </MenuItem>
        <MenuItem className={classes.delete} onClick={() => handleClick("Delete Profile")}>
          <ListItemIcon>
            <FaRegTrashAlt
              className={clsx(darkMode ? classes.deleteDark : classes.text)}
            />
          </ListItemIcon>
          <ListItemText
            className={clsx(darkMode ? classes.deleteDark : classes.text)}
            primary="Delete Profile"
          />
        </MenuItem>
      </MenuList>
      <UserSettingsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userSettings={userSettings}
      />
    </StyledContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  media: {
    width: "7rem",
    height: "7rem",
    margin: "2rem auto",
  },
  menu: {
    borderTop: "1px solid black",
    padding: "1rem",
  },
  menuDark: {
    borderTop: "1px solid white",
    padding: "1rem"
  },
  missingPic: {
    width: "7rem",
    height: "7rem",
    margin: "2rem auto",
  },
  text: {
    color: "#0f2612",
  },
  textDark: {
    color: " #22ccf2",
  },
  deleteDark: {
    color: "#c53a54",
  },
  item: {
    "&:hover": {
      background: "rgba(34,204,242,0.1)"
    }
  },
  delete: {
    "&:hover": {
      background: "rgba(191,33,62, 0.1)"
    }
  }
}));
