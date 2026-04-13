import { useFarms } from "@/hooks/useFarms";
import FarmList from "./FarmList"

export default function Farm() {
  const { loading } = useFarms();

  if (loading) return <p>Loading...</p>;

  return (
    <FarmList />
  );
}