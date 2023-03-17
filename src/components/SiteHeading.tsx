import { PropsWithChildren } from "react";
import { Text } from "react-native";
import tw from "twrnc";

export default function SiteHeading({ children }: PropsWithChildren<{}>) {
    return <Text style={tw`text-6xl my-8 font-extrabold self-center text-fuchsia-600`}>{children}</Text>
}
