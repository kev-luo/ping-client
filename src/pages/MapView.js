import React, { useState } from "react";

import LeftButtons from "../components/FloatingIcons/LeftButtons"
import NewPing from "../components/NewPing";
import Map from "../components/Map/Map";

export default function Mapview({ pingData, userData, darkMode }) {
  document.title="Ping | Map"
  const [open, setOpen] = useState(false);

  return (
    <div style={{marginTop: "4rem"}}>
      <LeftButtons open={open} setOpen={setOpen} userData={userData}/>
      <NewPing open={open} setOpen={setOpen}/>
      <Map darkMode={darkMode} data={pingData.data} error={pingData.error} />
    </div>
  );
}
