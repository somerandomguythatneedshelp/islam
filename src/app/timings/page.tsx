"use client";

import React, {useState, useEffect} from "react";
import {getCurrentSehriIftarTiming, timetable} from "@/app/types/RamadanTimings/PrayerTimings"; // Import the function

const SehriIftarPage = () => {
    const [currentTimings, setCurrentTimings] = useState<{
        date: string;
        sehri: string;
        iftar: string;
    } | null>(null);

    useEffect(() => {
        const updateTimings = () => {
            const currentDateTime = new Date();
            const result = getCurrentSehriIftarTiming(timetable, currentDateTime);

            // Update the state with the returned timing object
            setCurrentTimings(result);
        };

        updateTimings();

        // Update the timings every minute
        const interval = setInterval(updateTimings, 60000);

        return () => clearInterval(interval);
    }, []);

    if (!currentTimings) {
        return <p className="text-gray-400 text-xl">Loading...</p>;
    }

    return (
        <div
            className="sehri-iftar-page bg-[#212628] text-white min-h-screen flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold mb-8 text-center"></h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Sehri Card */}
                <div
                    className="relative rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://ramadan-websire.web.app/images/suhoor.png')", // Replace with your Sehri image URL
                        }}
                    ></div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    {/* Content */}
                    <div className="relative z-10 p-6">
                        <h2 className="text-3xl font-bold mb-4">Suhoor</h2>
                        <p className="text-lg">
                            <span className="font-medium">Date:</span> {currentTimings.date}
                        </p>
                        <p className="text-lg">
                            <span className="font-medium">Time:</span> {currentTimings.sehri}
                        </p>
                    </div>
                </div>

                {/* Iftar Card */}
                <div
                    className="relative rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://ramadan-websire.web.app/images/iftar.png')", // Replace with your Iftar image URL
                        }}
                    ></div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    {/* Content */}
                    <div className="relative z-10 p-6">
                        <h2 className="text-3xl font-bold mb-4">Iftar</h2>
                        <p className="text-lg">
                            <span className="font-medium">Date:</span> {currentTimings.date}
                        </p>
                        <p className="text-lg">
                            <span className="font-medium">Time:</span> {currentTimings.iftar}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SehriIftarPage;