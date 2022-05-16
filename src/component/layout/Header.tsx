import React, { useCallback, useState } from "react";
import { useRegenConnection } from "../../hooks";
import { AccountInfo } from "../profile/AccountInfo";

export const Header = (): JSX.Element => {
  const { initializeRegenChain } = useRegenConnection();
  const [walletConnected, setWalletConnected] = useState(false);

  const onWalletConnected = useCallback(() => {
    setWalletConnected(true);
  }, []);

  return (
    <div className="p-8 bg-blue-400 flex flex-col lg:flex-row justiy-between items-center gap-4 h-44 lg:h-28">
      <AccountInfo onConnect={onWalletConnected} />
      {!walletConnected ? (
        <div
          onClick={initializeRegenChain}
          className="lg:ml-auto cursor-pointer text-sm flex-none"
        >
          Add regen test chain
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
