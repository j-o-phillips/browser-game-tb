"use client";

import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const GameClient = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserContext();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      try {
        fetch(`api/game/${session.data?.user?.email}`)
          .then((response) => response.json())
          .then((response) => {
            setUserData(response);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [session]);

  const onClick = () => {
    console.log(userData);
  };
  return (
    <div className="py-10">
      <Button onClick={onClick}>Log userData</Button>
      <Button onClick={() => router.push("/game/bridge")}>To Bridge</Button>
    </div>
  );
};

export default GameClient;
