"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import updateUserLoc from "@/actions/updateUserLoc";
import TravellingModal from "./travellingModal";

const BridgeCommands = () => {
  const router = useRouter();
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    if (!userData) {
      router.push("/game");
    }
  }, [userData]);

  const handleTravel = () => {
    //update user data in db
    if (!globalData.targetName) {
      return null; //message user that there is no target
    }
    if (userData) {
      try {
        setGlobalData({ ...globalData, isTravelling: true });
        updateUserLoc(
          userData.id,
          globalData.targetName,
          globalData.targetPos!
        ).then((newUser) => {
          console.log(newUser);
          if (newUser) setUserData(newUser);

          //reset global data targets etc

          //Add delay
          setTimeout(() => {
            //Check for events
            setGlobalData({
              ...globalData,
              targetName: "",
              targetPos: null,
              distanceToTarget: null,
              isTravelling: false,
            });
          }, 3000);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className=" flex flex-col items-center gap-2 py-2">
        <h2>Commands</h2>
        <Button onClick={() => console.log(userData)}>Log user context</Button>
        <Button onClick={() => console.log(globalData)}>
          Log global context
        </Button>
        <hr className="w-2/3" />
        <Button onClick={handleTravel}>Launch</Button>

        <Button
          onClick={() => {
            signOut();
          }}
        >
          Retire to quarters (logout)
        </Button>
      </div>
      {globalData.isTravelling && <TravellingModal />}
    </>
  );
};

export default BridgeCommands;
