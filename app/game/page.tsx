"use client";

import GameClient from "@/components/GameClient";
import { SessionProvider } from "next-auth/react";

const Game = () => {
  return (
    <div>
      <SessionProvider>
        <GameClient />
      </SessionProvider>
    </div>
  );
};

export default Game;
