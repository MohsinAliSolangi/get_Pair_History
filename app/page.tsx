import React from "react";
import Image from "next/image";
import TradingTable from "./tradingTable";

export default function Home() {

  return (
    <div className="min-h-screen bg-[#343c48] p-8 sm:p-20 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="bg-[#303641] border-b border-[#000000] py-4 mb-8 rounded-md">
          <h1 className="text-center text-xl font-bold">Trading Dashboard</h1>
        </header>
        <main>
          <TradingTable/>
        </main>
      </div>
    </div>
  );
}
