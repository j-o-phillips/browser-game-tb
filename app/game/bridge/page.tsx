import BridgeCommands from "@/components/bridge/BridgeCommands";
import BridgeNav from "@/components/bridge/BridgeNav";

const Bridge = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="h-[50vh]  w-full ">
        <BridgeNav />
      </div>
      <div className="h-[50vh]  w-full">
        <h2>Your ship</h2>
        <h2>Ship image</h2>
      </div>
      <div className="h-[50vh]  w-full flex flex-col items-center gap-2 py-2">
        <BridgeCommands />
      </div>
      <div className="h-[50vh]  w-full">
        <h2>Ship Details</h2>
      </div>
    </div>
  );
};

export default Bridge;
