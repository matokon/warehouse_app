import { View, Text, FlatList, TextInput, TouchableOpacity, Pressable } from "react-native";
import api from "../../src/services/api";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useFocusEffect } from "expo-router";

export default function Inventory() {
  const [items, setItems] = useState<{id: number, name: string, quantity: number, unit: string}[]>([]);
  const [input, setInput] = useState("");

  useFocusEffect(
    useCallback(() => {
      api.get("/items")
        .then(res => setItems(res.data))
        .catch(err => console.error("Fetch items error:", err.message));
    }, [])
  );

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(input.toLowerCase())
  )

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: "#888", fontSize: 11, letterSpacing: 1.5 }}>WAREHOUSE</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ color: "white", fontSize: 32, marginVertical: 8, fontWeight: "bold" }}>Inventory</Text>
        <View style={{ backgroundColor: "#2a2a2a", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}>
          <Text style={{ color: "#8e8e93", fontSize: 13 }}>{items.length} items</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" ,backgroundColor: "#2a2a2a", paddingHorizontal: 14, height: 44, borderRadius: 6 }}>
      <IconSymbol size={18} name="magnifyingglass" color="#888" />
      <TextInput
          style={{color: "white", flex: 1, marginLeft: 10}}
          placeholderTextColor="#888"
          placeholder="Search by name"
          onChangeText={setInput}
          value={input}
      />
      <IconSymbol size={18} name="line.3.horizontal.decrease" color="#888" />
      </View>

      <View style={{ flexDirection: "row", gap: 8, marginVertical: 12 }}>
        {[
          { label: "ALL", active: true },
          { label: "OUT" },
          { label: "Strain Guages" },
          { label: "TODO LOGIC" },
        ].map((filter) => (
          <View
            key={filter.label}
            style={{
              backgroundColor: filter.active ? "#f5f5f7" : "#2a2a2a",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: filter.active ? "#0a0a0a" : "white", fontSize: 13 }}>{filter.label}</Text>
          </View>
        ))}
      </View>
        <Text style={{ color: "#5a5a60", fontSize: 12, marginTop: 10  }}>ALL ITEMS</Text>
      <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1, marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        data={filteredItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const status = item.quantity === 0
            ? { label: "OUT", color: "#ef4444", bg: "#2a1010" }
            : item.quantity < 10
            ? { label: "LOW", color: "#f59e0b", bg: "#2a1f00" }
            : { label: "IN STOCK", color: "#0d9488", bg: "#0a1f1e" }
          return (
          <Pressable onPress={() => {router.push({ pathname: `/item/${item.id}` as any, params: { name: item.name, quantity: item.quantity, id: item.id, unit: item.unit } })}}style={{ height: 81.5, flexDirection: "row", alignItems: "center", backgroundColor: "#141416", borderWidth: 1, borderColor: "#1f1f24", paddingHorizontal: 14, borderRadius: 14, marginVertical: 3 }}>
            <View style={{ width: 44, height: 44, backgroundColor: "#1e1e22", borderRadius: 10, overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
              <IconSymbol size={20} name="shippingbox" color="#888" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={{ color: "#f5f5f7", fontSize: 15, fontWeight: "600" }}>{item.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: status.bg, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6, gap: 4 }}>
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: status.color }} />
                  <Text style={{ color: status.color, fontSize: 11, fontWeight: "600" }}>{status.label}</Text>
                </View>
              </View>
              <Text style={{ color: "#8e8e93", fontSize: 12, marginTop: 3 }}>{item.quantity} {item.unit}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#f5f5f7", fontSize: 20, fontWeight: "600" }}>{item.quantity}</Text>
              <Text style={{ color: "#8e8e93", fontSize: 12 }}>{item.unit}</Text>
            </View>
          </Pressable>


        );}}
      />
      </View>
      <TouchableOpacity
        style={{ position: "absolute", bottom: 30, right: 20, backgroundColor: "#f5f5f7", paddingHorizontal: 20, paddingVertical: 14, borderRadius: 30 }}
        onPress={() => router.push("/add-item")}>
        <Text style={{ color: "#0a0a0a", fontSize: 16, fontWeight: "600" }}>+ Add item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
