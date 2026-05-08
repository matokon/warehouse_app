import { View, Text, Pressable } from "react-native";
import { useRouter, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddItem() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 69, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#f5f5f7" }}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: "white", fontSize: 18 }}>X</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
