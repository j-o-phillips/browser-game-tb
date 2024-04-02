"use client";

import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/actions/user";

const GameClient = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserContext();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      try {
        getUserByEmail(session.data?.user?.email!).then((response) => {
          setUserData(response);
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (session.status === "unauthenticated") {
      router.push("/auth/login");
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
