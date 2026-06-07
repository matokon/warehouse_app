import { View, Text} from "react-native";                                                       
import { SafeAreaView } from "react-native-safe-area-context";
                                             
    export default function Activity() {                               
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start", padding: 15 }}>
          <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: "600"  }}>WAREHOUSE</Text>
          <Text style={{ color: "#f5f5f7", fontSize: 28, fontWeight: "700"  }}>Activity</Text>                                                          
        </SafeAreaView>              
      );       
    } 