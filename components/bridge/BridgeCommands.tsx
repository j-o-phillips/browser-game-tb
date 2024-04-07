"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import updateUserLoc from "@/actions/updateUserLoc";
import TravellingModal from "./travellingModal";
import { validateFuelAndJumpDist } from "@/functions/misc";
import Card from "@/customUi/Card";
import { getUserById, updateUserLanded } from "@/actions/user";
import { updateShipFuelByid } from "@/actions/ship";
import { getMarketDataByName } from "@/actions/market";
import { MarketData } from "@/types";
import {
  CreateResourceData,
  createOrUpdateResourceInmarketOrShipCargoBay,
} from "@/actions/resource";

const BridgeCommands = () => {
  const router = useRouter();
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData, setUserData } = useUserContext();
  const [marketData, setMarketData] = useState<MarketData | null>();
  const [resourceData, setResourceData] = useState<CreateResourceData>({
    name: "Hydrogen",
    amount: 50,
    baseValue: 5,
    shipCargoBayId: userData?.ship.shipCargoBay.id,
  });

  useEffect(() => {
    if (!userData) {
      router.push("/game");
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      getMarketDataByName(userData?.currentLoc).then((data: any) => {
        console.log(data);
        setMarketData(data);
      });
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
        updateShipFuelByid(
          userData.ship.id,
          userData.ship.fuel - globalData.fuelRequiredToDest!
        );
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

  const handleLand = () => {
    //update user data in db
    try {
      updateUserLanded(userData?.id!, true).then((newUser) => {
        if (newUser) setUserData(newUser);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTakeOff = () => {
    try {
      updateUserLanded(userData?.id!, false).then((newUser) => {
        if (newUser) setUserData(newUser);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMine = () => {
    try {
      createOrUpdateResourceInmarketOrShipCargoBay(resourceData).then(
        (data) => {
          if (data) console.log(data);
          getUserById(userData?.id!).then((data) => {
            if (data) setUserData(data);
          });
        }
      );
    } catch (error) {
      console.log(error);
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

        {userData?.isLanded ? (
          <>
            <Button onClick={handleTakeOff}>Take Off</Button>
            <Button
              onClick={() => router.push(`/game/${userData?.currentLoc}`)}
            >
              To Spaceport
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleTravel}>Travel to Course</Button>
            {marketData?.landable && <Button onClick={handleLand}>Land</Button>}
            {marketData?.mineable && (
              <div className="flex items-center gap-2">
                <Button onClick={handleMine}>Mine</Button>
                <p className="text-sm">+ 50 hydrogen</p>
              </div>
            )}
          </>
        )}

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
