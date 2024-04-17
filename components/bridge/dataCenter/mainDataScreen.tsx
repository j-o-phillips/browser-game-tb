import Card from "@/customUi/Card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { useGlobalContext } from "@/context/GlobalContext";
import FactoryScreen from "./factory/factoryScreen";

const MainDataScreen = () => {
  const { userData } = useUserContext();
  const { globalData, setGlobalData } = useGlobalContext();
  return (
    <Card unCentered>
      <div className="p-4 w-full">
        <h1 className="text-center">Ship Computer</h1>
        <Tabs defaultValue="factories">
          <TabsList>
            <TabsTrigger value="factories">Factories</TabsTrigger>
            <TabsTrigger value="freeMarket">Free Market</TabsTrigger>
          </TabsList>
          <TabsContent value="factories">
            <FactoryScreen />
          </TabsContent>
          <TabsContent value="freeMarket">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default MainDataScreen;
