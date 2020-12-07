import React, { useState } from "react";

import LeftButtons from "../components/FloatingIcons/LeftButtons"
import RightUser from "../components/FloatingIcons/RightUser";
import NewPing from "../components/Feed/NewPing";
import Map from "../components/Map/Map";

export default function Mapview({ data, error }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LeftButtons open={open} setOpen={setOpen}/>
      <RightUser />
      <NewPing open={open} setOpen={setOpen}/>
      <Map data={data} error={error} />
    </>
  );
}
