import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";

import StyledFeedContainer from "../components/Styled/StyledFeedContainer";
import NewPing from "../components/Feed/NewPing";
import LeftButtons from "../components/FloatingButtons/LeftButtons";
import RightButtons from "../components/FloatingButtons/RightButtons";
import Ping from "../components/SinglePing/Ping";

import { useQuery } from "@apollo/client";
import { useMapContext } from "../utils/useMapContext";
import {
  FETCH_PING_QUERY,
  FETCH_PINGS_BY_LOCATION,
  NEW_COMMENT_SUBSCRIPTION,
} from "../utils/graphql";

export default function SinglePing() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { pingId } = useParams();
  const {
    state: { userPosition },
    dispatch,
  } = useMapContext();
  const { subscribeToMore, data, error } = useQuery(FETCH_PING_QUERY, {
    variables: { pingId },
  });

  const pingsData = useQuery(FETCH_PINGS_BY_LOCATION, {
    skip: !userPosition,
    variables: { long: userPosition?.longitude, latt: userPosition?.latitude },
  });

  useEffect(() => {
    const longitude = data && data.getPing.location.coordinates[0];
    const latitude = data && data.getPing.location.coordinates[1];

    if (longitude && latitude) {
      dispatch({
        type: "UPDATE_VIEWPORT",
        payload: { latitude, longitude, zoom: 13 },
      });
    }
    const unsubscribe = subscribeToMore
      ? subscribeToMore({
          document: NEW_COMMENT_SUBSCRIPTION,
          variables: { pingId },
          updateQuery: (prevPing, { subscriptionData }) => {
            if (!subscriptionData) return prevPing;
            return {
              ...prevPing,
              getPing: subscriptionData.getPing,
            };
          },
        })
      : null;
    if (unsubscribe) {
      return () => unsubscribe();
    }
  }, [subscribeToMore, pingId, data, dispatch]);

  return (
    <StyledFeedContainer>
      <LeftButtons />
      <RightButtons open={open} setOpen={setOpen} />
      <NewPing open={open} setOpen={setOpen} />
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
