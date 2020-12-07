import React, { useState } from "react";

import LeftButtons from "../components/FloatingButtons/LeftButtons"
import NewPing from "../components/Feed/NewPing";
import Map from "../components/Map/Map";

export default function Mapview({ data, error }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LeftButtons open={open} setOpen={setOpen}/>
      <NewPing open={open} setOpen={setOpen}/>
      <Map data={data} error={error} />
    </>
  );
}
