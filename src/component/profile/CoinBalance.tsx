import { Coin } from "@cosmjs/stargate";
import React from "react";

export interface ICoinBalance {
  coin: Coin;
}

export const CoinBalance = ({ coin }: ICoinBalance): JSX.Element => {
  return (
    <div className="text-lg flex gap-2">
      <div>Balance: {coin.amount}</div>
    </div>
  );
};
