"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import updateUserLoc from "@/actions/updateUserLoc";
import TravellingModal from "./travellingModal";
import { validateFuelAndJumpDist } from "@/functions/misc";
import Card from "@/customUi/Card";

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
      return console.log("No target"); //message user that there is no target
    }
    //fuel and engine validation
    const journeyIsNotValid = validateFuelAndJumpDist(
      userData?.ship.fuel!,
      userData?.ship.shipEngine.maxJump!,
      globalData?.fuelRequiredToDest!,
      globalData?.distanceToTarget!
    );

    if (journeyIsNotValid) {
      console.log(journeyIsNotValid);
      return journeyIsNotValid;
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
      <Card>
        <h2>Commands</h2>
        <Button onClick={() => console.log(userData)}>Log user context</Button>
        <Button onClick={() => console.log(globalData)}>
          Log global context
        </Button>
        <hr className="w-2/3" />
        <Button onClick={handleTravel}>Launch</Button>
        <Button onClick={() => router.push(`/game/${userData?.currentLoc}`)}>
          Dock at Spaceport
        </Button>

        <Button
          onClick={() => {
            signOut();
          }}
        >
          Retire to quarters (logout)
        </Button>
      </Card>
      {globalData.isTravelling && <TravellingModal />}
    </>
  );
};

export default BridgeCommands;
