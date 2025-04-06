"use client";

import { useState } from "react";
import Image from "next/image";
import MetroMap from "@/components/metro-map";
import LoadingAnimation from "@/components/loading-animation";
import {
  calculateTravelTime,
  calculateFare,
  kochiMetroStations,
} from "@/lib/metro-utils";

export default function MetroCalculator() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState<{
    time: number;
    stations: number;
    fare: number;
  } | null>(null);
  //   const [showMap, setShowMap] = useState(false)
  const showMap = false;
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = () => {
    if (origin && destination) {
      setIsLoading(true);

      // Simulate loading for the animation
      setTimeout(() => {
        const originIndex = kochiMetroStations.findIndex(
          (station) => station.id === origin
        );
        const destinationIndex = kochiMetroStations.findIndex(
          (station) => station.id === destination
        );

        if (originIndex !== -1 && destinationIndex !== -1) {
          const stationCount = Math.abs(destinationIndex - originIndex);
          const time = calculateTravelTime(stationCount);
          const fare = calculateFare(stationCount);

          setResult({
            time,
            stations: stationCount,
            fare,
          });
          setIsLoading(false);
        }
      }, 2000); // 2 second loading animation
    }
  };

  const resetForm = () => {
    setOrigin("");
    setDestination("");
    setResult(null);
  };

  const swapStations = () => {
    setOrigin(destination);
    setDestination(origin);
    setResult(null);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg border border-sky-100 overflow-hidden">
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="origin"
                  className="block text-sky-800 font-medium"
                >
                  Origin Station
                </label>
                <div className="relative">
                  <select
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none"
                  >
                    <option value="" disabled>
                      Select starting station
                    </option>
                    {kochiMetroStations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={swapStations}
                  className="rounded-full h-10 w-10 flex items-center justify-center text-sky-600 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 rotate-90 md:rotate-0"
                  disabled={!origin && !destination}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="destination"
                  className="block text-sky-800 font-medium"
                >
                  Destination Station
                </label>
                <div className="relative">
                  <select
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none"
                  >
                    <option value="" disabled>
                      Select destination station
                    </option>
                    {kochiMetroStations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:bg-sky-300"
                  disabled={
                    !origin ||
                    !destination ||
                    origin === destination ||
                    isLoading
                  }
                >
                  {isLoading ? "Calculating..." : "Calculate Time"}
                </button>
                <button
                  onClick={resetForm}
                  className="border border-sky-200 text-sky-700 hover:bg-sky-50 py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Reset
                </button>
              </div>

              {/* <button
                onClick={() => setShowMap(!showMap)}
                className="w-full text-sky-600 hover:text-sky-700 py-2 font-medium focus:outline-none"
              >
                {showMap ? "Hide Metro Map" : "Show Metro Map"}
              </button> */}
            </div>

            <div className="flex items-center justify-center">
              {isLoading ? (
                <LoadingAnimation />
              ) : result ? (
                <div className="space-y-4 w-full">
                  <h3 className="text-xl font-semibold text-sky-800 text-center">
                    Journey Details
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-sky-50 rounded-lg p-4 flex items-center gap-3">
                      <div className="bg-sky-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-sky-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-sky-600">Travel Time</p>
                        <p className="font-semibold text-sky-900">
                          {result.time} minutes
                        </p>
                      </div>
                    </div>

                    <div className="bg-sky-50 rounded-lg p-4 flex items-center gap-3">
                      <div className="bg-sky-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-sky-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="5" y="2" width="14" height="16" rx="2" />
                          <rect x="2" y="18" width="20" height="4" rx="2" />
                          <line x1="12" y1="18" x2="12" y2="22" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-sky-600">Stations</p>
                        <p className="font-semibold text-sky-900">
                          {result.stations} stations
                        </p>
                      </div>
                    </div>

                    <div className="bg-sky-50 rounded-lg p-4 flex items-center gap-3">
                      <div className="bg-sky-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-sky-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="1" x2="12" y2="23" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-sky-600">Estimated Fare</p>
                        <p className="font-semibold text-sky-900">
                          ₹{result.fare}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : showMap ? (
                <MetroMap />
              ) : (
                <div className="text-center p-6 bg-sky-50 rounded-lg w-full">
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <Image
                        src="/high-speed-train-concept-illustration.png"
                        alt="Kochi Metro Train"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-sky-800 mb-2">
                    Plan Your Journey
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Select your origin and destination stations to calculate
                    travel time, number of stations, and estimated fare.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showMap && !isLoading && (
        <div className="mt-6">
          <MetroMap
            highlightOrigin={origin}
            highlightDestination={destination}
          />
        </div>
      )}
    </div>
  );
}
