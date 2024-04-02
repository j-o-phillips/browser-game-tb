import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import Card from "@/customUi/Card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PlayerDetails = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    if (!userData) {
      router.push("/game");
    }
  }, [userData]);

  return (
    <Card>
      <h2>Player Details</h2>
      <h4>Credits: {userData?.credits}</h4>
      <Button onClick={() => router.push(`/game/${userData?.currentLoc}`)}>
        To Spaceport
      </Button>
    </Card>
  );
};

export default PlayerDetails;
