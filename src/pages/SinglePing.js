import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";

import UserContainer from "../components/User/UserContainer";
import Map from "../components/Map/Map";
import Ping from "../components/SinglePing/Ping";

import { useQuery } from "@apollo/client";
import { useMapContext } from "../utils/useMapContext";
import {
  FETCH_PING_QUERY,
  FETCH_PINGS_BY_LOCATION,
  NEW_COMMENT_SUBSCRIPTION,
} from "../utils/graphql";

export default function SinglePing() {
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
    <div className={classes.root}>
      <div className={classes.grid}>
        <Grid container spacing={2}>
          <Grid
            item
            container
            direction="column"
            lg={4}
            justify="space-between"
          >
            <UserContainer />
            <Map data={pingsData.data} error={pingsData.error} />
          </Grid>

          <Grid item container direction="column" lg={8}>
            <Ping data={data} error={error} />
          </Grid>
        </Grid>
      </div>
    </div>
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
