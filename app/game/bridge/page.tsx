import BridgeCommands from "@/components/bridge/BridgeCommands";
import BridgeNav from "@/components/bridge/BridgeNav";

const Bridge = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  sm:h-screen p-4 gap-4 text-[#bcbcdc]">
      <div className="h-full  w-full bg-gradient-to-r from-[#00f2ff52] to-[#000033] border-2 border-cyan-500 ">
        <BridgeNav />
      </div>
      <div className="h-full  w-full bg-gradient-to-r from-[#00f2ff52] to-[#000033] border-2 border-cyan-500 ">
        <h2>Your ship</h2>
        <h2>Ship image</h2>
      </div>
      <div
        className="h-full  w-full flex flex-col 
      items-center gap-2 py-2 bg-gradient-to-r from-[#00f2ff52] to-[#000033] border-2 border-cyan-500 "
      >
        <BridgeCommands />
      </div>
      <div className="h-full w-full bg-gradient-to-r from-[#00f2ff52] to-[#000033] border-2 border-cyan-500 ">
        <h2>Ship Details</h2>
      </div>
    </div>
  );
};

export default Bridge;
