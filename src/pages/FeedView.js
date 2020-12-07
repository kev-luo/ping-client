import React, { useState } from "react";

import StyledFeedContainer from "../components/Styled/StyledFeedContainer";
import TabContainer from "../components/Feed/TabContainer";
import LeftButtons from "../components/FloatingIcons/LeftButtons";
import RightUser from "../components/FloatingIcons/RightUser";
import NewPing from "../components/Feed/NewPing";
import Feed from "../components/Feed/Feed";
import { useAuthContext } from "../utils/useAuthContext";

export default function Dashboard({ data, error }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <StyledFeedContainer>
      {user && <TabContainer />}
      {user && <RightUser />}
      <LeftButtons open={open} setOpen={setOpen} />
      <NewPing open={open} setOpen={setOpen} />
      <Feed data={data} error={error} />
    </StyledFeedContainer>
  );
}
