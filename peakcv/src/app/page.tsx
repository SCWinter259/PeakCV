'use client';
import After from "@/components/After";
import Before from "../components/Before"
import { useState } from "react";

export default function Home() {
  const [loadingAfter, setLoadingAfter] = useState<boolean>(false);

  return (
    <div className="flex h-screen w-screen">
      <Before setLoadingAfter={setLoadingAfter}/>
      <After loadingAfter={loadingAfter} />
    </div>
  );
}
