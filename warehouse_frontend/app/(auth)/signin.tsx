import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import api from "../../src/services/api";
import * as SecureStore from 'expo-secure-store';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/users/sign_in", {
        user: { email, password }
      });
      const token = response.headers['authorization'];
      await SecureStore.setItemAsync('jwt_token', token);
      const team_id = response.data.user.team_id
      if (team_id){
        await SecureStore.setItemAsync('team_id', String(team_id));
        router.replace("/(tabs)/inventory");
      } else {
        await SecureStore.deleteItemAsync('team_id');
        router.replace("/jointeam");
      }
    } catch (error: any) {
      console.error("Log error:", error.response?.data);
      Alert.alert("Error", "Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <Pressable onPress={() => router.back()} style={{ padding: 16 }}>
        <IconSymbol size={20} name="chevron.left" color="white" />
      </Pressable>

      <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
        <Text style={{ color: "#f5f5f7", fontSize: 28, fontWeight: "700", marginBottom: 6 }}>Welcome back</Text>
        <Text style={{ color: "#5a5a60", fontSize: 14, marginBottom: 32 }}>Sign in to access your warehouse</Text>

        <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: "600", marginBottom: 8 }}>EMAIL</Text>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#1e1e22", borderRadius: 10, borderWidth: 1, borderColor: "#1f1f24", paddingHorizontal: 14, height: 48, marginBottom: 16 }}>
          <IconSymbol size={16} name="envelope" color="#5a5a60" />
          <TextInput
            placeholder="johnpork@gmail.com"
            placeholderTextColor="#3a3a40"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{ flex: 1, color: "#f5f5f7", fontSize: 15, marginLeft: 10 }}
          />
        </View>

        <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: "600", marginBottom: 8 }}>PASSWORD</Text>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#1e1e22", borderRadius: 10, borderWidth: 1, borderColor: "#1f1f24", paddingHorizontal: 14, height: 48, marginBottom: 8 }}>
          <IconSymbol size={16} name="lock" color="#5a5a60" />
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#3a3a40"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{ flex: 1, color: "#f5f5f7", fontSize: 15, marginLeft: 10 }}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <IconSymbol size={16} name={showPassword ? "eye.slash" : "eye"} color="#5a5a60" />
          </Pressable>
        </View>

        <Pressable style={{ alignSelf: "flex-end", marginBottom: 24 }}>
          <Text style={{ color: "#f5f5f7", fontSize: 13, fontWeight: "500" }}>Forgot password?</Text>
        </Pressable>

        <Pressable
          onPress={handleSignIn}
          disabled={loading}
          style={{ backgroundColor: "#f5f5f7", borderRadius: 12, height: 50, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "#0a0a0a", fontSize: 16, fontWeight: "600" }}>Sign In</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ alignItems: "center", paddingBottom: 32 }}>
        <Text style={{ color: "#5a5a60", fontSize: 14 }}>
          Don't have an account?{" "}
          <Text onPress={() => router.push("/signup")} style={{ color: "#f5f5f7", fontWeight: "600" }}>Sign up</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
