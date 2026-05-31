import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";
import api from "@/src/services/api";


export default function AddItem() {
  const router = useRouter();
  const { quantity, name, id, unit } = useLocalSearchParams()
  const [currentQuantity, setCurrentQuantity] = useState(Number(quantity))
  const status = Number(quantity) === 0                                                                                                                 
    ? { label: "OUT", color: "#ef4444", bg: "#2a1010" }
    : Number(quantity) < 10                                                                                                                             
    ? { label: "LOW", color: "#f59e0b", bg: "#2a1f00" }                                                                                               
    : { label: "IN STOCK", color: "#f5f5f7", bg: "#1f1f24" }

  const changeQuantity = (amount: number) => {
    const newQuantity = currentQuantity + amount
    setCurrentQuantity(newQuantity)
    updateQuantity(newQuantity)
  }

  const updateQuantity = async (newQuantity: number) => {
    await api.patch(`/items/${id}`, { item: { quantity: newQuantity } })
  }

  const deleteItem = () => {
    Alert.alert("Usuń przedmiot", `Czy na pewno chcesz usunąć "${name}"?`, [
      { text: "Anuluj", style: "cancel" },
      { text: "Usuń", style: "destructive", onPress: async () => {
        await api.delete(`/items/${id}`)
        router.replace("/(tabs)/inventory")
      }},
    ])
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0a0a" , alignItems: "center"}}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 69, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#1f1f24" }}>
        <Pressable onPress={() => router.back()}>
          <IconSymbol size={20} name="chevron.left" color="white" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ color: "#f5f5f7", fontSize: 11, fontWeight: "600", marginBottom: 2 }}>INVENTORY</Text>
          <Text style={{ color: "#f5f5f7", fontSize: 20, fontWeight: "700" }}>{name}</Text>
      </View>
      </View>
        <View style={{ width: 350, height: 199, backgroundColor: "#141416", borderRadius: 18, paddingBottom: 16, paddingTop: 18, paddingHorizontal: 16, marginTop: 16 }}>
        <View style={{ width: 301, height: 19, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: "600" }}>ON HAND</Text>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: status.bg, borderRadius: 6, paddingHorizontal: 8, height: 19, justifyContent: "center" }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: status.color, margin: 4 }} /> 
                <Text style={{ color: status.color, fontWeight: "600", textAlign: "center" }}>{status.label}</Text>
            </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#141416", borderRadius: 18, borderColor: "#1f1f24", borderWidth: 1, paddingVertical: 20, paddingHorizontal: 16, marginTop: 12 }}>
            <Pressable onPress={() => changeQuantity(-1)}
            style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 10, backgroundColor: pressed ? "#2a2a35" : "#1f1f24", alignItems: "center", justifyContent: "center", opacity: pressed ? 0.7 : 1 })}>
              <Text style={{ color: "#f5f5f7", fontSize: 20, fontWeight: "600" }}>−</Text>
            </Pressable>
            <Text style={{ color: "#f5f5f7", fontSize: 48, fontWeight: "700" }}>{currentQuantity}</Text>
            <Pressable onPress={() => changeQuantity(+1)}
            style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 10, backgroundColor: pressed ? "#2a2a35" : "#1f1f24", alignItems: "center", justifyContent: "center", opacity: pressed ? 0.7 : 1 })}>
              <Text style={{ color: "#f5f5f7", fontSize: 20, fontWeight: "600" }}>+</Text>
            </Pressable>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
            <Pressable onPress={() => changeQuantity(-10)}
                style={({ pressed }) => ({ backgroundColor: pressed ? "#2a2a35" : "#1f1f24" , borderRadius: 10, borderColor: "#2a2a30", borderWidth: 1, paddingVertical: 14, paddingHorizontal: 28, marginTop: 4, alignItems: "center", justifyContent: "center" })}>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#f5f5f7" }}>-10</Text>
            </Pressable>
            <Pressable onPress={() => changeQuantity(-5)}
                style={({ pressed }) => ({ backgroundColor: pressed ? "#2a2a35" : "#1f1f24", borderRadius: 10, borderColor: "#2a2a30", borderWidth: 1, paddingVertical: 14, paddingHorizontal: 28, marginTop: 4, alignItems: "center", justifyContent: "center" })}>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#f5f5f7" }}>-5</Text>
            </Pressable>
            <Pressable onPress={() => changeQuantity(+5)}
                style={({ pressed }) => ({ backgroundColor: pressed ? "#2a2a35" : "#1f1f24", borderRadius: 10, borderColor: "#2a2a30", borderWidth: 1, paddingVertical: 14, paddingHorizontal: 28, marginTop: 4, alignItems: "center", justifyContent: "center" })}>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#f5f5f7" }}>+5</Text>
            </Pressable>
            <Pressable onPress={() => changeQuantity(+10)}
                style={({pressed}) => ({ backgroundColor: pressed ? "#2a2a35" : "#1f1f24", borderRadius: 10, borderColor: "#2a2a30", borderWidth: 1, paddingVertical: 14, paddingHorizontal: 28, marginTop: 4, alignItems: "center", justifyContent: "center" })}>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#f5f5f7" }}>+10</Text>
            </Pressable>
        </View>
      </View>
      <View style={{ backgroundColor: "#141416", marginTop: 10, borderRadius: 12, borderWidth: 1, width: 350, height: 64, paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text style={{ color: "#5a5a60", marginBottom: 6, fontSize: 10, fontWeight: "600" }}>UNIT</Text>
          <Text style={{ color: "#f5f5f7", fontSize: 15, fontWeight: "500"}}>{unit}</Text>
      </View>
      <View style={{ flex: 1 }} />
      <Pressable onPress={deleteItem}
                style={{ backgroundColor: "#221012", borderRadius: 14, borderColor: "#3a1820", borderWidth: 1, paddingVertical: 14, flexDirection: "row", paddingHorizontal: 28, marginTop: 12, marginBottom: 10, alignItems: "center", justifyContent: "center", width: 350, gap: 8 }}>
                <IconSymbol size={18} name="trash" color="#ef4444" />
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#ef4444" }}>Delete item</Text>
      </Pressable>
    </SafeAreaView>
  )
}
