"use client";

import { addPlanet } from "@/actions/planets";
import { Button } from "@/components/ui/button";

const DockPage = () => {
  const onCreate = () => {
    addPlanet().then((data) => {
      console.log(data.success);
    });
  };
  return (
    <div>
      <Button onClick={onCreate}>aDD PLAnet</Button>
    </div>
  );
};

export default DockPage;
