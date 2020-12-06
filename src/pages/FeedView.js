import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import StyledFeedContainer from "../components/Styled/StyledFeedContainer";
import TabContainer from "../components/Feed/TabContainer";
import LeftButtons from "../components/FloatingButtons/LeftButtons"
import NewPing from "../components/Feed/NewPing";
import Feed from "../components/Feed/Feed";

import { useQuery } from "@apollo/client";
import { FETCH_PINGS_QUERY } from "../utils/graphql";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const { data, error } = useQuery(FETCH_PINGS_QUERY);

  return (
    <StyledFeedContainer>
      <TabContainer />
      <LeftButtons open={open} setOpen={setOpen}/>
      <NewPing open={open} setOpen={setOpen}/>
      <Feed data={data} error={error}/>
    </StyledFeedContainer>
  );
}