'use client';
import Before from "./Before"

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <Before />
      <div className="flex w-1/2 border-1 border-slate-700 p-4">
        <div className="h-full w-full bg-neutral-900">

        </div>
      </div>
    </div>
  );
}
