import { useState } from "react";
import { Oval } from "react-loader-spinner";

export default function Farmers() {
  const [loading] = useState(false);

  if (loading)
    return (
      <div className="flex min-h-[100svh] w-full items-center justify-center">
        <Oval
          height={50}
          width={50}
          color="#4fa94d"
          visible={true}
          ariaLabel="loading"
        />
      </div>
    );

  return <div className="p-6">Farmers component</div>;
}
