import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import StyledFeedContainer from "../components/Styled/StyledFeedContainer";
import NewPing from "../components/Feed/NewPing";
import Feed from "../components/Feed/Feed";
import LeftButtons from "../components/FloatingButtons/LeftButtons"
import RightButtons from "../components/FloatingButtons/RightButtons"
import { useAuthContext } from "../utils/useAuthContext";

import { useQuery } from "@apollo/client";
import { useMapContext } from "../utils/useMapContext";
import { FETCH_PINGS_QUERY } from "../utils/graphql";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
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
      <RightButtons open={open} setOpen={setOpen}/>
      <NewPing open={open} setOpen={setOpen}/>
      <Feed data={data} error={error}/>
    </StyledFeedContainer>
  );
}