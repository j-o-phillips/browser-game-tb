import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";

const Warehouse = () => {
  const { userData, setUserData } = useUserContext();
  const { globalData, setGlobalData } = useGlobalContext();
  return (
    <div>
      <Button onClick={() => console.log(userData)}>Print user data</Button>
      <Button onClick={() => console.log(globalData)}>Print global data</Button>
      <Button
        onClick={() =>
          setGlobalData({
            ...globalData,
            currentFactoryData: null,
            dataCenterModalOpen: !globalData.dataCenterModalOpen,
          })
        }
      >
        Close Data Center
      </Button>
    </div>
  );
};

export default Warehouse;
