import BridgeCommands from "@/components/bridge/BridgeCommands";
import BridgeNav from "@/components/bridge/BridgeNav";
import ShipDetails from "@/components/bridge/ShipDetails";
import Card from "@/customUi/Card";

const Bridge = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  sm:h-screen p-4 gap-4 text-primary-foreground">
      <div>
        <BridgeNav />
      </div>
      <div className="h-full  w-full bg-[#00f2ff52] border-2 border-cyan-500 ">
        <h2>Your ship</h2>
        <h2>Ship image</h2>
      </div>
      <div>
        <BridgeCommands />
      </div>
      <div>
        <ShipDetails />
      </div>
    </div>
  );
};

export default Bridge;
