import { useFarmers } from "@/hooks/useFarmers";
import FarmerList from "./FarmerList";
import { Oval } from "react-loader-spinner";

export default function Farmers() {
  const { loading } = useFarmers();

  if (loading)
    return (
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

  return <FarmerList />;
}
