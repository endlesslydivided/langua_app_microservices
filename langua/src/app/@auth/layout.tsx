"use client"

import Image from "next/image";

import bg from "@/assets/abstractBG/blackWhiteLines.gif";
import { SnackbarProvider } from "notistack";

export const metadata = {
  title: "Langua | Auth",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="flex h-screen ">
        <div className="m-auto bg-slate-50 w-full h-full grid lg:grid-cols-2">
          <div className="relative overflow-hidden flex flex-col justify-center">
            <div className="text-center absolute z-10 w-full ">
              <h1 className="text-white text-8xl font-bold pb-3">LANGUA</h1>
              <p className="w-3/4 mx-auto text-2xl text-gray-200">
                Application to learn languages
              </p>
            </div>
            <div className="filter brightness-50 h-full">
              <Image src={bg} alt={""} className="object-cover h-full w-full" />
            </div>
          </div>
          <div className="right flex flex-col justify-evenly">
            <div className="text-center py-10">{children}</div>
          </div>
        </div>
      </main>

  );
}
