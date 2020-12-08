import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { FiImage } from "react-icons/fi";
import { FaUser, FaRegTrashAlt } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import StyledContainer from "../components/Styled/StyledContainer";
import { FETCH_USER_QUERY } from "../utils/graphql";
import { useAuthContext } from "../utils/useAuthContext";
import UserSettingsModal from "../components/User/U_Settings/UserSettingsModal";

export default function UserSettings() {
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

  const userProfile = data?.getUser ? (
    <Avatar
      src={data.getUser.imageUrl}
      alt={data.getUser.username}
      className={classes.media}
    />
  ) : (
    <Avatar className={classes.missingPic}>
      <FaUser />
    </Avatar>
  );

  return (
    <StyledContainer>
      {userProfile}
      <MenuList className={classes.menu}>
        <MenuItem onClick={() => history.goBack()}>
          <ListItemIcon><TiArrowBackOutline /></ListItemIcon>
          <ListItemText primary="Go Back" />
        </MenuItem>
        <MenuItem onClick={() => handleClick("Update Avatar")}>
          <ListItemIcon><FiImage /></ListItemIcon>
          <ListItemText primary="Update Avatar" />
        </MenuItem>
        <MenuItem onClick={() => handleClick("Delete Profile")}>
          <ListItemIcon><FaRegTrashAlt /></ListItemIcon>
          <ListItemText primary="Delete Profile" />
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
    display: "block",
    width: "150px",
    height: "150px",
    backgroundPosition: "50% 50%",
    backroundSize: "cover",
    borderRadius: "50%",
    margin: "2rem auto",
  },
  menu: {
    borderTop: "1px solid black",
    padding: "1rem"
  }
}));
