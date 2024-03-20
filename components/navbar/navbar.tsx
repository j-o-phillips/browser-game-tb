"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="w-full flex justify-end fixed">
      <Button size="sm" className="p-4 m-2" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
