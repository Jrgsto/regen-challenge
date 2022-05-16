import { Coin, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { useState } from "react";
import { config } from "../config/regenNetwork";
import { IAccount } from "../interfaces/regenNetwork";

interface IUseRegenConnection {
  connectWallet: () => Promise<void>;
  initializeRegenChain: () => Promise<void>;
  account: IAccount | undefined;
  isLoading: boolean;
}

export const useRegenConnection = (): IUseRegenConnection => {
  const [account, setAccount] = useState<IAccount>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initializeConnectionAndGetAccount =
    async (): Promise<IAccount | null> => {
      const chainId = config.chainId;
      try {
        await window.keplr!.enable(chainId);
        const offlineSigner = window.keplr!.getOfflineSigner(chainId);
        await SigningStargateClient.connectWithSigner(
          config.rpc,
          offlineSigner
        );
        const account = await offlineSigner.getAccounts();
        return {
          address: account[0].address,
          balance: await getBalance(account[0].address),
        };
      } catch (error) {
        return null;
      }
    };

  const connectWallet = async (): Promise<void> => {
    setIsLoading(true);
    if (!window.keplr) {
      alert("Please install keplr extension");
    } else {
      const account = await initializeConnectionAndGetAccount();
      if (account) setAccount(account);
    }
    setIsLoading(false);
  };

  const getBalance = async (
    address: string
  ): Promise<readonly Coin[] | undefined> => {
    const client = await StargateClient.connect(config.rpc);
    try {
      const balance = await client.getAllBalances(address);
      return balance;
    } catch (e) {
      console.log("Error", e);
    }
  };

  /* Use this one for testing purpose only */
  const initializeRegenChain = async (): Promise<void> => {
    if (window.keplr) {
      try {
        await window.keplr.experimentalSuggestChain(config);
        alert("Regen testchain added!");
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return {
    connectWallet,
    initializeRegenChain,
    account,
    isLoading,
  };
};
