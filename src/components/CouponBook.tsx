import { View, Text } from "react-native"
import tw from "twrnc";


interface Props {
  amount: number
}

export default function CouponBook({ amount }: Props) {
  const maxTokens = 5

  const couponBalance = Math.min(amount, maxTokens)
  const notCollected = maxTokens - couponBalance

  return (

    <View style={tw`flex flex-col items-center p-1 text-white bg-gray-900 rounded-md`}>
      <Text style={tw`text-white`}>Collect 5 cookies to receive a 50% discount on your next purchase!</Text>

      <Text style={tw`flex flex-row gap-1 place-self-center`}>
        {[...Array(couponBalance)].map((_, i) => <span key={i}>🍪</span>)}
        {[...Array(notCollected)].map((_, i) => <span key={i}>⚪</span>)}
      </Text>
    </View>
  )
}