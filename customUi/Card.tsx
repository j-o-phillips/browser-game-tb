import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full  w-full bg-[#00f2ff52] border-2 border-cyan-500 flex flex-col items-center gap-2 py-2">
      {children}
    </div>
  );
};

export default Card;
