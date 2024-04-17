import CargoDisplay from "@/components/bridge/cargo/CargoDisplay";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  disabled?: boolean;
};

const Modal = ({ children, disabled }: ModalProps) => {
  if (disabled) return null;
  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-background p-6">
      {children}
    </div>
  );
};

export default Modal;
