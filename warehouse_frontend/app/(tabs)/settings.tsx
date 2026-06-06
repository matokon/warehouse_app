    import { View, Text, Pressable, Alert} from "react-native";
    import * as SecureStore from "expo-secure-store";           
    import { useRouter } from "expo-router";         
    import api from "../../src/services/api";
    import { IconSymbol } from "@/components/ui/icon-symbol";
    import { SafeAreaView } from "react-native-safe-area-context";
                                                
    export default function Home() {
      const router = useRouter();   
                     
      const handleLogout = async () => {
        try {
          await api.delete("/users/sign_out");
        } catch (error: any) {
          console.error("Logout error:", error.response?.status, error.response?.data);
        } finally {
          await SecureStore.deleteItemAsync("jwt_token");
          router.replace("/(auth)/welcome");
        }
      };
      const handleLeave = () => {
        Alert.alert("Leave team", "Are you sure you want to leave this team?", [
          { text: "Cancel", style: "cancel" },
          { text: "Leave", style: "destructive", onPress: async () => {
            try {
              await api.delete("/teams/leave");
            } catch (error: any) {
              console.error("Leave error:", error.response?.status, error.response?.data);
            } finally {
              await SecureStore.deleteItemAsync("team_id");
              router.replace("/jointeam");
            }
          }},
        ]);
      };
      const handleAddToTeam = async () => {
        try {
          const res = await api.get("/teams/me");
          Alert.alert(res.data.name, `Team code: ${res.data.access_code}`);        } catch (error: any) {
          console.error("Error:", error);
        } finally {
        }
      };
        
      return (
        <SafeAreaView style={{ flex: 1}}>
          <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <Pressable
            style={({ pressed }) => ({ backgroundColor: pressed ? "#1e1e22" : "#141416", opacity: pressed ? 0.8 : 1, marginTop: 10, borderRadius: 12, borderWidth: 1, width: 375, height: 64, paddingVertical: 12, paddingHorizontal: 14 })}
            onPress={handleAddToTeam}
            >
              <Text style={{ color: "#5a5a60", fontWeight: 600 }}>Team code</Text>
              <Text style={{ color: "#ffff", marginTop: 5, fontWeight: 400 }}>Share it to add people to your team</Text>
            </Pressable>
            <Pressable
            style={({ pressed }) => ({ backgroundColor: pressed ? "#1e1e22" : "#141416", opacity: pressed ? 0.8 : 1, marginTop: 10, borderRadius: 12, borderWidth: 1, width: 375, height: 64, paddingVertical: 12, paddingHorizontal: 14 })}
            onPress={handleLeave}
            >
              <Text style={{ color: "#5a5a60", fontWeight: 600 }}>Leave team</Text>
              <Text style={{ color: "#ffff", marginTop: 5, fontWeight: 400 }}>Stop sharing this team's inventory</Text>
            </Pressable>
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>                 
            <Pressable onPress={handleLogout}
              style={{ backgroundColor: "#221012", borderRadius: 14, borderColor: "#3a1820", borderWidth: 1, paddingVertical: 14, flexDirection: "row", paddingHorizontal: 28, marginTop: 12, marginBottom: 10, alignItems: "center", justifyContent: "center", width: 350, gap: 8 }}>
              <IconSymbol size={18} name="rectangle.portrait.and.arrow.right" color="#ef4444" />
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#ef4444" }}>Log out</Text>
            </Pressable>                            
          </View>     
        </SafeAreaView>         
      );       
    } 