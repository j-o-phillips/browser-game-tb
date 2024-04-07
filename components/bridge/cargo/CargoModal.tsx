import CargoDisplay from "./CargoDisplay";

const CargoModal = () => {
  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-background">
      <div className="grid grid-cols-1 sm:grid-cols-2 py-10 text-primary-foreground px-4 gap-4">
        <CargoDisplay />
      </div>
    </div>
  );
};

export default CargoModal;
