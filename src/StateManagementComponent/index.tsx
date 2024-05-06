"use client";
//https://nextjs.org/docs/app/building-your-application/rendering/client-components
//[NextJS] this is considered a client component
import { useState } from "react";
export const StateManagementComponent = (props) => {
  const [myState, setMyState] = useState(false);

  return (
    <button onClick={() => setMyState(!myState)}>
      <p>Hello i work :)</p>
      <p>{JSON.stringify(myState)}</p>
    </button>
  );
};
