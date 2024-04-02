"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  getUserByEmail,
  getUserById,
  getUserByIdOrEmail,
  updateUserCredits,
} from "@/actions/user";

const UserCommands = () => {
  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newCredits, setNewCredits] = useState<number>(0);

  const onGetUserById = (e: any) => {
    e.preventDefault();
    getUserByIdOrEmail({ userId: userId }).then((data) => {
      console.log(data);
    });
  };

  const onGetUserByEmail = (e: any) => {
    e.preventDefault();
    getUserByIdOrEmail({ email: email }).then((data) => {
      console.log(data);
    });
  };

  const onUpdateUserCredits = (e: any) => {
    e.preventDefault();
    updateUserCredits(userId, newCredits).then((data) => {
      console.log(data);
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl underline">User</h1>
      <div className="flex items-start gap-2">
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onGetUserById}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="userId"
              placeholder="User Id"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
            <Button type="submit" size="sm">
              Get User by Id
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onGetUserByEmail}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="userEmail"
              placeholder="User Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button type="submit" size="sm">
              Get User by Email
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onUpdateUserCredits}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="userId"
              placeholder="User iD"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
            <input
              type="number"
              name="userCredits"
              placeholder="Set User Credits"
              onChange={(e) => {
                setNewCredits(Number(e.target.value));
              }}
            />
            <Button type="submit" size="sm">
              Update User Credits
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCommands;
