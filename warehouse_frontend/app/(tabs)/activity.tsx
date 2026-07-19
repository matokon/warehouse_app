import api from "@/src/services/api";
import { useFocusEffect } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import { View, Text, SectionList } from "react-native";                                                       
import { SafeAreaView } from "react-native-safe-area-context";

    type ActivityItem = {
      id: number,
      action: string,
      quantity_change: number,
      item_name: string,
      user_name: string,
      created_at: string
    }

    function groupByDate(items: ActivityItem[]) {
      const groups: Record<string, ActivityItem[]> = {};
      for (const item of items) {
        const date = new Date(item.created_at).toLocaleDateString("pl-PL", {
          day: "numeric", month: "long", year: "numeric",
        });
        if (!groups[date]) groups[date] = [];
        groups[date].push(item);
      }
      return Object.entries(groups).map(([title, data]) => ({ title, data }));
    }
    function getIconName(item: ActivityItem){
      return item.action === "created" ? "plus"
        : item.action === "deleted" ? "trash"
        : item.quantity_change > 0  ? "arrow.up"
        : "arrow.down"
    }
    function getSign(item: ActivityItem){
      return item.quantity_change > 0 ? "+" : "-"
    }
    function getTone(item: ActivityItem){
      if (item.action === "deleted") return { color: "#ef4444", bg: "#2a1010" }
      if (item.quantity_change > 0) return { color: "#2dd4bf", bg: "#0a1f1e" }
      if (item.quantity_change < 0) return { color: "#ef4444", bg: "#2a1010" }
      return { color: "#5a5a60", bg: "#1f1f24" }
    }
    function getAmount(item: ActivityItem){
      if (item.quantity_change === 0) return "0"
      return getSign(item) + Math.abs(item.quantity_change)
    }
                          
    export default function Activity() {    
    const [sections, setSections] = useState<{ title: string; data: ActivityItem[] }[]>([]);

    useFocusEffect(
      useCallback(() => {
        api.get("/activities")
          .then(res => setSections(groupByDate(res.data)))
        .catch(err => console.error("Fetch items error:", err.message));
    }, [])
    );
      
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0a0a", justifyContent: "flex-start", alignItems: "stretch", padding: 15 }}>
          <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: "600"  }}>WAREHOUSE</Text>
          <Text style={{ color: "#f5f5f7", fontSize: 28, fontWeight: "700"  }}>Activity</Text>
          <SectionList
          style={{ width: "100%" }}
          sections={sections}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index, section }) => {
          const tone = getTone(item)
          const isFirst = index === 0
          const isLast = index === section.data.length - 1
          return (
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#141416",
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderTopLeftRadius: isFirst ? 14 : 0,
            borderTopRightRadius: isFirst ? 14 : 0,
            borderBottomLeftRadius: isLast ? 14 : 0,
            borderBottomRightRadius: isLast ? 14 : 0,
            borderBottomWidth: isLast ? 0 : 1,
            borderBottomColor: "#1f1f24",
          }}>
            <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: tone.bg, alignItems: "center", justifyContent: "center" }}>
              <SymbolView name={getIconName(item)} tintColor={tone.color} size={16} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ color: "#f5f5f7", fontSize: 14, fontWeight: "600", marginBottom: 3 }} numberOfLines={1}>
                  {item.item_name}
                </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Text style={{ color: "#5a5a60", fontSize: 12 }}>
                  {new Date(item.created_at).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                </Text>
                <SymbolView name="circlebadge.fill" tintColor="#5a5a60" size={3} />
                <Text style={{ color: "#5a5a60", fontSize: 12, flex: 1 }} numberOfLines={1}>
                  {item.action} by {item.user_name}
                </Text>
              </View>
            </View>
            <Text style={{ color: tone.color, fontSize: 15, fontWeight: "700", fontVariant: ["tabular-nums"] }}>
              {getAmount(item)}
            </Text>
          </View>
          )}}
          renderSectionHeader={({ section }) => (
            <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: "600", letterSpacing: 0.5, backgroundColor: "#0a0a0a", paddingTop: 20, paddingBottom: 8 }}>
              {section.title.toUpperCase()}
            </Text>
          )}
          />                                                 
        </SafeAreaView>              
      );       
    } 