// src/components/FarmList.tsx
import { Farm } from "../../services/farms";

interface Props {
  farms: Farm[];
}

export default function FarmList({ farms }: Props) {
  return (
    <ul>
      {farms.map(farm => (
        <li key={farm.id}>{farm.name}</li>
      ))}
    </ul>
  );
}