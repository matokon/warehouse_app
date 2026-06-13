import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";
import api from "../src/services/api";

const UNITS = ["pcs", "rolls", "kg", "m", "l"];

export default function AddItem() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [unit, setUnit] = useState("pcs");
  const [showUnitPicker, setShowUnitPicker] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }
    try {
      await api.post("/items", { item: { name, quantity: Number(quantity), unit } });
      router.back();
    } catch (e: any) {
      console.error("Save error:", e?.response?.status, e?.response?.data, e?.message);
      Alert.alert("Error", "Could not save item");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 69, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#1f1f24" }}>
        <Pressable onPress={() => router.back()}>
          <IconSymbol size={20} name="xmark" color="white" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ color: "#f5f5f7", fontSize: 11, fontWeight: "600", marginBottom: 2 }}>INVENTORY</Text>
          <Text style={{ color: "#f5f5f7", fontSize: 20, fontWeight: "700" }}>New item</Text>
        </View>
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#d4d4d8" : "#f5f5f7",
            borderRadius: 10,
            width: 56,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.8 : 1,
          })}>
          <Text style={{ fontSize: 14, color: "#0a0a0a", fontWeight: "600" }}>Save</Text>
        </Pressable>
      </View>

      <View style={{ padding: 16, gap: 20 }}>

        <View>
          <Text style={{ color: "#8e8e93", fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>NAME</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Strain gauges"
            placeholderTextColor="#555"
            style={{ backgroundColor: "#141416", borderWidth: 1, borderColor: "#1f1f24", borderRadius: 10, padding: 14, color: "white", fontSize: 15 }}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>

          <View style={{ zIndex: 10 }}>
            <Text style={{ color: "#8e8e93", fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>UNIT</Text>
            <Pressable
              onPress={() => setShowUnitPicker(v => !v)}
              style={{ backgroundColor: "#141416", borderWidth: 1, borderColor: "#1f1f24", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 14, flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ color: "white", fontSize: 15 }}>{unit}</Text>
              <IconSymbol size={14} name={showUnitPicker ? "chevron.up" : "chevron.down"} color="#555" />
            </Pressable>
            {showUnitPicker && (
              <View style={{ position: "absolute", top: 70, left: 0, backgroundColor: "#141416", borderWidth: 1, borderColor: "#1f1f24", borderRadius: 10, overflow: "hidden", minWidth: 100 }}>
                {UNITS.map(u => (
                  <Pressable
                    key={u}
                    onPress={() => { setUnit(u); setShowUnitPicker(false); }}
                    style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#1f1f24" }}>
                    <Text style={{ color: "white", fontSize: 15 }}>{u}</Text>
                    {unit === u && <IconSymbol size={14} name="checkmark" color="#f5f5f7" />}
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: "#8e8e93", fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>QUANTITY</Text>
            <View style={{ backgroundColor: "#141416", borderWidth: 1, borderColor: "#1f1f24", borderRadius: 10, paddingHorizontal: 14, flexDirection: "row", alignItems: "center" }}>
              <TextInput
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={{ flex: 1, color: "white", fontSize: 15, paddingVertical: 14 }}
              />
              <Text style={{ color: "#555", fontSize: 14 }}>{unit}</Text>
            </View>
          </View>

        </View>
      </View>


    </SafeAreaView>
  );
}
