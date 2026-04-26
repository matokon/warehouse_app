import { View, Text, FlatList, TextInput } from "react-native";
import api from "../../src/services/api";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function Inventory() {
  const [items, setItems] = useState<{id: number, name: string}[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    api.get("/items")
      .then(res => setItems(res.data))
      .catch(err => console.error("Fetch items error:", err.message));
  }, []);

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
      <FlatList
        style={{ flex: 1, marginTop: 20 }}
        data={filteredItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ color: "white" }}>{item.name}</Text>
        )}
      />
    </SafeAreaView>
  );
}
