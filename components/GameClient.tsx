"use client";

import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { Button } from "./ui/button";

const GameClient = () => {
  const { data, setData } = useUserContext();

  useEffect(() => {
    try {
      fetch("api/game")
        .then((response) => response.json())
        .then((response) => {
          setData(response);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClick = () => {
    console.log(data);
  };
  return (
    <div className="py-10">
      <Button onClick={onClick}>Log data</Button>
    </div>
  );
};

export default GameClient;
