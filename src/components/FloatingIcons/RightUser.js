import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import TabContainer from "../Styled/StyledFloatingBtnContainer";
import { useDashboardContext } from "../../utils/useDashboardContext";

const RightTabContainer = styled(TabContainer)`
  right: 6rem;
  ul {
    top: 0;
  }
  li {
    flex-direction: column;
    span {
      margin-bottom: 1rem;
    }
  }
`;

export default function RightUser({ open, setOpen }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const {
    state: { selectedUser },
  } = useDashboardContext();

  function authorPic(selectedUser) {
    return selectedUser?.imageUrl ? (
      <Avatar
        src={selectedUser.imageUrl}
        alt={selectedUser.username}
        className={classes.img}
      />
    ) : (
      <Avatar className={classes.img} />
    );
  }

  return (
    <RightTabContainer>
      <ul>
        <li>
          <span>@{selectedUser?.username}</span>
          {authorPic(selectedUser)}
        </li>
      </ul>
    </RightTabContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  img: {
    width: "4rem",
    height: "4rem",
  },
}));
