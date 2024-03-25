"use client";

import BridgeView from "@/components/bridge/bridgeView";

import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { getTimeToTarget } from "@/functions/equations";
import { GlobalContextData } from "@/types";
import {
  FirstPersonControls,
  FlyControls,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Vector3 } from "three";

const Bridge = () => {
  const router = useRouter();
  // const { globalData, setGlobalData } = useGlobalContext();
  //  const { userData, setUserData } = useUserContext();
  // const [timeToTarget, setTimeToTarget] = useState<number>();

  // //TIME TO TARGET
  // useEffect(() => {
  //   let timer: any = null;

  //   if (globalData && globalData.eta && globalData.isTravelling) {
  //     timer = setInterval(() => {
  //       if (globalData.isTravelling && globalData && globalData.eta) {
  //         //IF ARRIVED AT TARGET
  //         if (globalData.eta < Date.now()) {
  //           const newGlobalData = {
  //             ...globalData,
  //             isTravelling: false,
  //             canLand: true,
  //           };
  //           setGlobalData(newGlobalData);
  //           if (userData && globalData.targetPos) {
  //             setUserData({
  //               ...userData,
  //               currentPos: [globalData.targetPos[0], globalData.targetPos[1]],
  //             });
  //           }
  //         }
  //         //ELSE

  //         let date = Date.now();
  //         let time = globalData.eta - date;
  //         let formatted = Math.trunc(time / 1000);
  //         setTimeToTarget(formatted);
  //       }
  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [globalData?.isTravelling, globalData?.eta]);

  //};
  // return (
  //   <div className="flex flex-col justify-center items-center py-10 gap-4">
  //     <Button onClick={() => console.log(userData)}>Log user context</Button>
  //     <Button onClick={() => console.log(globalData)}>
  //       Log global context
  //     </Button>

  //     <h4>Time to target: {timeToTarget}s </h4>
  //     {globalData.canLand && (
  //       <Button onClick={() => router.push(`/game/${globalData.targetName}`)}>
  //         Land
  //       </Button>
  //     )}
  //     <Button onClick={() => router.push("/game/bridge/map")}>To map</Button>
  //     <Button onClick={() => router.push("/game/bridge/console")}>
  //       To console
  //     </Button>
  //   </div>
  // );
  //new

  return (
    <div
      className="overlow-hidden   w-full"
      style={{
        height: "100vh",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 30],
          fov: 25,
        }}
      >
        <BridgeView />
      </Canvas>
    </div>
  );
};

export default Bridge;
