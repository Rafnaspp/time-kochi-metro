"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingAnimation() {
  const [position, setPosition] = useState(0);
  const [stationIndex, setStationIndex] = useState(0);
  const stationNames = [
    "Aluva",
    "Pulinchodu",
    "Companypady",
    "Ambattukavu",
    "Muttom",
  ];

  console.log(stationIndex);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        // Reset position when train reaches the end
        if (prev >= 100) {
          setStationIndex((prevIndex) => (prevIndex + 1) % stationNames.length);
          return 0;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 bg-sky-50 rounded-lg p-4 relative overflow-hidden">
      <div className="text-center mb-2">
        <h3 className="text-lg font-medium text-sky-800">
          Calculating Journey...
        </h3>
        {/* <p className="text-sm text-sky-600">
          Passing through: {stationNames[stationIndex]}
        </p> */}
      </div>

      {/* Track */}
      <div className="absolute bottom-12 left-0 right-0 h-2 bg-sky-200 mx-4"></div>

      {/* Stations */}
      <div className="absolute bottom-12 left-10 w-3 h-3 rounded-full bg-sky-600 -translate-y-0.5"></div>
      <div className="absolute bottom-12 left-1/4 w-3 h-3 rounded-full bg-sky-600 -translate-y-0.5"></div>
      <div className="absolute bottom-12 left-1/2 w-3 h-3 rounded-full bg-sky-600 -translate-y-0.5"></div>
      <div className="absolute bottom-12 left-3/4 w-3 h-3 rounded-full bg-sky-600 -translate-y-0.5"></div>
      <div className="absolute bottom-12 right-10 w-3 h-3 rounded-full bg-sky-600 -translate-y-0.5"></div>

      {/* Train */}
      <div
        className="absolute bottom-16 transition-transform duration-100 ease-linear"
        style={{ transform: `translateX(${position}%)`, left: "0%" }}
      >
        <div className="relative w-24 h-12">
          <Image
            src="/MEtroLod.png"
            alt="Moving Metro Train"
            width={96}
            height={48}
            className="object-contain"
          />
        </div>
      </div>

      {/* Loading progress */}
      <div className="absolute bottom-4 left-0 right-0 mx-4">
        <div className="w-full bg-sky-200 rounded-full h-2.5">
          <div
            className="bg-sky-600 h-2.5 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${position}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
