"use client";

import Box from './components/Home/Box';
import Link from 'next/link';
//import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="container mx-auto">
            {/* <Box
          imageSource={NamazIMG}
          imageAlt="Image description"
          text="Prayer"
          href="/prayer"
        /> */}

            <Link href="/quran">
              <Box
                  imageSource="https://github.com/somerandomguythatneedshelp/islam/blob/main/public/images/Quran.png?raw=true"
                  imageAlt="Image description"
                  text="Q'uran"
              />
            </Link>

              <h1 className="pt-6 pb-8">‎</h1>

              <Link href="/timings">
                  <Box
                      imageSource="https://github.com/somerandomguythatneedshelp/islam/blob/main/public/images/namaz.png?raw=true"
                      imageAlt="Image description"
                      text="Salah Timings"
                  />
              </Link>
          </div>
        </div>

      </main>
  );
}
