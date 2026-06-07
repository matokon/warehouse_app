import api from "@/src/services/api";
import { useFocusEffect } from "expo-router";
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
        <SafeAreaView style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start", padding: 15 }}>
          <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: "600"  }}>WAREHOUSE</Text>
          <Text style={{ color: "#f5f5f7", fontSize: 28, fontWeight: "700"  }}>Activity</Text> 
          <SectionList
          sections={sections}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ color: "#f5f5f7", fontSize: 15 }}>
              {item.user_name} {item.action} {item.item_name} ({item.quantity_change})
            </Text>
            <Text style={{ color: "#5a5a60", fontSize: 12 }}>
              {new Date(item.created_at).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: "600", paddingTop: 16, paddingBottom: 4 }}>
              {section.title.toUpperCase()}
            </Text>
          )}
          />                                                 
        </SafeAreaView>              
      );       
    } 