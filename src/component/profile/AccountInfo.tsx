import React, { useEffect } from "react";
import { useRegenConnection } from "../../hooks";
import { Button, LoadingSpinner } from "../design";
import { CoinBalance } from "./CoinBalance";

export const AccountInfo = ({
  onConnect,
}: {
  onConnect: () => void;
}): JSX.Element => {
  const { connectWallet, account, isLoading } = useRegenConnection();

  useEffect(() => {
    if (account) {
      onConnect();
    }
    // eslint-disable-next-line
  }, [account?.address]);

  return (
    <div className="grow flex flex-1 gap-4 lg:flex-row">
      {!account && (
        <div className="lg:mr-auto">
          <Button onClick={connectWallet} disabled={isLoading}>
            <div className="flex gap-2 text-white items-center justify-center">
              <span>Connect wallet</span>
              {isLoading && <LoadingSpinner />}
            </div>
          </Button>
        </div>
      )}

      {account && (
        <div className="flex gap-4 items-center">
          <div className="rounded-full bg-gray-200 p-4 w-20 h-20 flex items-center justify-center">
            H
          </div>
          <div className="flex gap-2 flex-col w-44 lg:w-auto">
            <div className="truncate overflow-hidden">{account.address}</div>
            <div>
              {account && account.balance && (
                <CoinBalance
                  key={account.balance[0].denom}
                  coin={account.balance[0]}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
