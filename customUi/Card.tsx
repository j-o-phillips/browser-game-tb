import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  unCentered?: boolean;
};
const Card = ({ children, unCentered }: CardProps) => {
  return (
    <div
      className={`h-full  w-full bg-[#00f2ff52] border-2 border-cyan-500 flex flex-col ${
        unCentered ? "items-start" : "items-center"
      } gap-2 py-2`}
    >
      {children}
    </div>
  );
};

export default Card;
