import { Coin } from "@cosmjs/stargate";

export interface IAccount {
  address: string;
  balance: readonly Coin[] | undefined;
}
