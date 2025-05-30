"use client";

import Spinner from "@/components/Spinner";
import { useState } from "react";

const Before = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="flex w-1/2 border-1 border-gray-500 p-4">
      <div className="flex items-center h-full w-full bg-white">
        <Spinner loading={loading} message={"Test for Spinner"}/>
      </div>
    </div>
  );
};

export default Before;
