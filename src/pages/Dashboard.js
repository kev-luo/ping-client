import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import StyledFeedContainer from "../components/Styled/StyledFeedContainer";
import Feed from "../components/Feed/Feed";
import LeftButtons from "../components/FloatingButtons/LeftButtons"
import RightButtons from "../components/FloatingButtons/RightButtons"
import { useAuthContext } from "../utils/useAuthContext";

import { useQuery } from "@apollo/client";
import { useMapContext } from "../utils/useMapContext";
import { FETCH_PINGS_QUERY } from "../utils/graphql";

export default function Dashboard() {
  const classes = useStyles();
  const { user } = useAuthContext();
  const { state: {userPosition}} = useMapContext();
  let long;
  let latt;

  if (userPosition) {
    long = userPosition.longitude;
    latt = userPosition.latitude;
  }

  const { subscribeToMore, data, error } = useQuery(FETCH_PINGS_QUERY);

  return (
    <StyledFeedContainer>
      <LeftButtons />
      <RightButtons />
      <Feed data={data} error={error}/>
    </StyledFeedContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1, 1),
  },
  grid: {
    margin: theme.spacing(2, 1),
  },
  paper: {
    padding: theme.spacing(2),
    // color: theme.palette.text.secondary,
  },
}));
