"use client";
import React, { useState } from "react";
import axios from "axios";

type TradeData = {
  blockchain: string;
  hash: string;
  pair: string;
  date: number;
  token_price_vs: number;
  token_price: number;
  token_amount: number;
  token_amount_vs: number;
  token_amount_usd: number;
  type: string;  // Assuming this holds "Buy" or "Sell" info
  sender: string;
  token_amount_raw: string;
  token_amount_raw_vs: string;
  operation: string;
};

const TradingTable = () => {
  const [data, setData] = useState<TradeData[]>([]);
  const [pairAddress, setPairAddress] = useState("");
  const [selectedTrade, setSelectedTrade] = useState<TradeData | null>(null);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (pairAddress) {
      axios
        .get(`https://production-api.mobula.io/api/1/market/trades/pair?address=${pairAddress}&blockchain=ethereum&amount=10`)
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  };

  const handleRowClick = (trade: TradeData) => {
    setSelectedTrade(trade);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="mb-8 flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter Pair Address"
            value={pairAddress}
            onChange={(e) => setPairAddress(e.target.value)}
            className="w-full p-2 rounded-md bg-[#2b313b] text-white border border-[#000000]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#0d7fa8] text-white font-bold rounded-md hover:bg-[#095a70]"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="overflow-x-auto p-4 bg-[#303641] rounded-xl shadow-lg">
        <table className="table-auto w-full border-collapse text-sm text-left">
          <thead className="bg-[#343c48] text-white">
            <tr>
              <th className="px-4 py-3 border border-[#000000]">Date</th>
              <th className="px-4 py-3 border border-[#000000]">Token Price (USD)</th>
              <th className="px-4 py-3 border border-[#000000]">Total (USD)</th>
              <th className="px-4 py-3 border border-[#000000]">Token Price (ETH)</th>
              <th className="px-4 py-3 border border-[#000000]">Amount (DEXT)</th>
              <th className="px-4 py-3 border border-[#000000]">Amount (WETH)</th>
              <th className="px-4 py-3 border border-[#000000]">Trade Maker</th>
              <th className="px-4 py-3 border border-[#000000]">Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(row)}
                className={
                  index % 2 === 0
                    ? "bg-[#2b313b] text-white cursor-pointer"
                    : "bg-[#343c48] text-white cursor-pointer"
                }
              >
                <td className="border border-[#000000] px-4 py-2">{new Date(row.date).toLocaleString()}</td>
                <td className="border border-[#000000] px-4 py-2">{row.token_price.toFixed(4)}</td>
                <td className="border border-[#000000] px-4 py-2">${row.token_amount_usd.toFixed(2)}</td>
                <td className="border border-[#000000] px-4 py-2">{row.token_price_vs.toFixed(4)}</td>
                <td className="border border-[#000000] px-4 py-2">{row.token_amount.toFixed(2)}</td>
                <td className="border border-[#000000] px-4 py-2">{row.token_amount_vs.toFixed(4)}</td>
                <td className="border border-[#000000] px-4 py-2">{row.sender}</td>
                <td
  className={`border border-[#000000] px-4 py-2 ${
    row.type === "buy" ? "text-green-400" : row.type === "sell" ? "text-red-400" : "text-white"
  }`}
>
  {row.type}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTrade && (
        <div className="mt-6 p-4 bg-[#343c48] text-white rounded-xl shadow-lg">
          <h3 className="text-xl font-bold">Trade Details</h3>
          <div className="mt-4">
            <p><strong>Blockchain:</strong> {selectedTrade.blockchain}</p>
            <p><strong>Transaction Hash:</strong> {selectedTrade.hash}</p>
            <p><strong>Pair Address:</strong> {selectedTrade.pair}</p>
            <p><strong>Operation Type:</strong> {selectedTrade.operation}</p>
            <p><strong>Trade Type:</strong> {selectedTrade.type}</p> {/* Show Trade Type here */}
          </div>
        </div>
      )}
    </>
  );
};

export default TradingTable;
