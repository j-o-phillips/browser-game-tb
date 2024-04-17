import { allResources, resources } from "@/data/resources";
import { useEffect, useState } from "react";

const FacProdLineOptions = ({ line }: { line: string }) => {
  const currentResource = allResources.find((r) => r.name === line);

  return (
    <div className="flex">
      <h1>{currentResource?.name}</h1>
      {/* <button onClick={() => console.log(currentResource)}>sdsdsd</button> */}
    </div>
  );
};

export default FacProdLineOptions;
