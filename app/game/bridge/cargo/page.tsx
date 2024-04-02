import CargoDisplay from "@/components/bridge/cargo/CargoDisplay";
import { useUserContext } from "@/context/UserContext";

const Cargo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 py-10 text-primary-foreground px-4 gap-4">
      <CargoDisplay />
    </div>
  );
};

export default Cargo;
