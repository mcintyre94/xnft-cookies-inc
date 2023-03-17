import { Text } from "react-native";
import { getAccount, getAssociatedTokenAddressSync } from "@solana/spl-token"

import { Screen } from "../components/Screen";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import { usePublicKeys, useSolanaConnection } from "../hooks/xnft-hooks";
import SiteHeading from "../components/SiteHeading";
import CouponBook from "../components/CouponBook";

export function HomeScreen() {
  const backpackConnection = useSolanaConnection();

  // Using the backpack connection doesn't work: https://github.com/coral-xyz/backpack/issues/3363
  const connection = useMemo(() => {
    if (!backpackConnection) return undefined
    return new Connection(backpackConnection.rpcEndpoint, backpackConnection.commitment)
  }, [backpackConnection])

  const publicKeys = usePublicKeys()

  const publicKey = useMemo(() => {
    if (!publicKeys) return undefined
    return new PublicKey(publicKeys['solana'])
  }, [publicKeys])

  const [balance, setBalance] = useState<number | undefined>(undefined)

  async function getTokenBalance(connection: Connection, userPublicKey: PublicKey) {
    // This is my coupon mint
    const mint = new PublicKey("6ECroWv425bgRZWj1wnMuFLhvvYRBseykKPaK3LH5exc")
    const tokenAccountAddress = getAssociatedTokenAddressSync(mint, userPublicKey)
    const tokenAccount = await getAccount(connection, tokenAccountAddress)
    setBalance(Number(tokenAccount.amount))
  }

  useEffect(() => {
    if (!connection || !publicKey) return
    getTokenBalance(connection, publicKey)
  }, [connection]);

  return (
    <Screen>
      <SiteHeading>Cookies Inc</SiteHeading>

      {balance ? <CouponBook amount={balance} /> : <Text>Loading...</Text>}
    </Screen>
  );
}
