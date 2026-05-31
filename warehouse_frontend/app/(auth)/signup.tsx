import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import api from "../../src/services/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await api.post("/users", {
        user: { name, email, password, password_confirmation: password }
      });
      Alert.alert("Success", "Account created successfully!");
      router.replace("/signin");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.errors?.[0] || "Registration failed");
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
        <Text style={{ color: "#5a5a60", fontSize: 14, marginBottom: 32 }}>Set up an account to start tracking inventory</Text>

        <Text style={{ color: "#5a5a60", fontSize: 11, fontWeight: "600", marginBottom: 8 }}>FULL NAME</Text>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#1e1e22", borderRadius: 10, borderWidth: 1, borderColor: "#1f1f24", paddingHorizontal: 14, height: 48, marginBottom: 16 }}>
          <IconSymbol size={16} name="person" color="#5a5a60" />
          <TextInput
            placeholder="John Pork"
            placeholderTextColor="#3a3a40"
            value={name}
            onChangeText={setName}
            style={{ flex: 1, color: "#f5f5f7", fontSize: 15, marginLeft: 10 }}
          />
        </View>

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
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#1e1e22", borderRadius: 10, borderWidth: 1, borderColor: "#1f1f24", paddingHorizontal: 14, height: 48, marginBottom: 24 }}>
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

        <Pressable
          onPress={handleSignUp}
          disabled={loading}
          style={{ backgroundColor: "#f5f5f7", borderRadius: 12, height: 50, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "#0a0a0a", fontSize: 16, fontWeight: "600" }}>Create Account</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ alignItems: "center", paddingBottom: 32 }}>
        <Text style={{ color: "#5a5a60", fontSize: 14 }}>
          Already have an account?{" "}
          <Text onPress={() => router.push("/signin")} style={{ color: "#f5f5f7", fontWeight: "600" }}>Sign in</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
