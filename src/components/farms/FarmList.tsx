import { useFarms } from "@/hooks/useFarms";

export default function FarmList() {
  const { farms, loading } = useFarms();

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {farms.map((farm) => (
        <li key={farm.farm_id}>
          {farm.name} - {farm.region}
        </li>
      ))}
    </ul>
    
  );
}