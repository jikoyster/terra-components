import { useFarms } from "@/hooks/useFarms";
import FarmList from "./FarmList";
import { Oval } from "react-loader-spinner";

export default function Farm() {
  const { loading } = useFarms();

  if (loading) return (
    <div className="flex min-h-[100svh] w-full items-center justify-center">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        visible={true}
        ariaLabel="loading"
      />
    </div>
  );


  return (
    <FarmList />
  );
}