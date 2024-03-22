"use client";

import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const GameClient = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    try {
      fetch("api/game")
        .then((response) => response.json())
        .then((response) => {
          setUserData(response);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClick = () => {
    console.log(userData);
  };
  return (
    <div className="py-10">
      <Button onClick={onClick}>Log userData</Button>
      <Button onClick={() => router.push("/game/bridge")}>To map</Button>
    </div>
  );
};

export default GameClient;
