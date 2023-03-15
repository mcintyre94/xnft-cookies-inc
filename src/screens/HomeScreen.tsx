import { Text, FlatList } from "react-native";
import tw from "twrnc";
import { getAccount, getAssociatedTokenAddress, getAssociatedTokenAddressSync, TokenAccountNotFoundError } from "@solana/spl-token"

import { Screen } from "../components/Screen";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import { usePublicKeys, useSolanaConnection } from "../hooks/xnft-hooks";

export function HomeScreen() {
  const features = [
    "tailwind",
    "recoil",
    "native styling",
    "fetching code from an API",
    "using a FlatList to render data",
    "Image for both remote & local images",
    "custom fonts",
    "sign a transaction / message",
    "theme hook with light/dark support",
  ];

  const connection = useSolanaConnection();
  console.log(connection?.rpcEndpoint);

  async function getTokenBalance(connection: Connection) {
    const tokenAccountAddress = new PublicKey("3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa")
    const tokenAccount = await getAccount(connection, tokenAccountAddress)
    console.log({ balance: tokenAccount.amount })
  }

  useEffect(() => {
    if (!connection) return
    getTokenBalance(connection)
  }, [connection]);

  return (
    <Screen>
      <Text style={tw`mb-4`}>
        You'll find several examples of how to build xNFTs using react-native:
      </Text>
      <FlatList
        data={features}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>- {item}</Text>}
      />
    </Screen>
  );
}
