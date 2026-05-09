import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";


export default function AddItem() {
  const router = useRouter();
  const { quantity, name } = useLocalSearchParams()
  const status = Number(quantity) === 0                                                                                                                 
    ? { label: "OUT", color: "#ef4444", bg: "#2a1010" }
    : Number(quantity) < 10                                                                                                                             
    ? { label: "LOW", color: "#f59e0b", bg: "#2a1f00" }                                                                                               
    : { label: "IN STOCK", color: "#0d9488", bg: "#0a1f1e" } 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0a0a" , alignItems: "center"}}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 69, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#1f1f24" }}>
        <Pressable onPress={() => router.back()}>
          <IconSymbol size={20} name="chevron.left" color="white" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ color: "#14b8a6", fontSize: 11, fontWeight: "600", marginBottom: 2 }}>INVENTORY</Text>
          <Text style={{ color: "#f5f5f7", fontSize: 20, fontWeight: "700" }}>{name}</Text>
      </View>
      </View>
        <View style={{ width: 350, height: 199, backgroundColor: "#141416", borderRadius: 18, paddingBottom: 16, paddingTop: 18, paddingHorizontal: 16, marginTop: 16 }}>
        <View style={{ width: 301, height: 19, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: 600 }}>ON HAND</Text>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: status.bg, borderRadius: 6, paddingHorizontal: 8, height: 19, justifyContent: "center" }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: status.color, margin: 4 }} /> 
                <Text style={{ color: status.color, fontWeight: 600, textAlign: "center" }}>{status.label}</Text>
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
