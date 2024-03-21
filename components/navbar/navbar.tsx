"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return <LogoutButton />;
};

export default Navbar;
