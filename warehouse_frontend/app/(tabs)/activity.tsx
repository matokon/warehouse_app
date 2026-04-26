    import { View, Text, TouchableOpacity, FlatList} from "react-native";
    import * as SecureStore from "expo-secure-store";           
    import { useRouter } from "expo-router";         
    import api from "../../src/services/api";
    import { useEffect, useState } from "react";                                                          
                                             
    export default function Home() {
      const router = useRouter();
      const [items, setItems] = useState<{id: number, name: string}[]>([]);

      useEffect(() => {
        console.log("Fetching items from:", api.defaults.baseURL);
        api.get("/items")
          .then(res => {
            console.log("Items fetched:", res.data);
            setItems(res.data);
          })
          .catch(err => {
            console.error("Fetch items error:", err.message, err.code, err.config?.url);
          });
      }, []);
                                 
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
        
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <FlatList                                                                                                                           
            data={items}  
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (                                                                                                       
              <Text style={{ color: "white" }}>{item.name}</Text>
            )}                                                                                                                                
          />                     
          <TouchableOpacity                                  
            onPress={handleLogout}
            style={{ marginTop: 20, backgroundColor: "#e11d48", padding: 12, borderRadius: 8 }}
          >                                                                                    
            <Text style={{ color: "white" }}>Wyloguj</Text>
          </TouchableOpacity>                              
        </View>              
      );       
    } 