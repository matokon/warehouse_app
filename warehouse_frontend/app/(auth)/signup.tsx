import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert, ActivityIndicator } from "react-native";
import api from "../../src/services/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post("/users", {
        user: { 
          email, 
          password, 
          password_confirmation: confirmPassword
        }
      });
      console.log("Registered:", response.data);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/signin");
    } catch (error: any) {
      console.error("Registration error:", error.response?.status, error.response?.data);
      Alert.alert("Error", error.response?.data?.errors?.[0] || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "black" }}>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          color: 'white',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          width: 350,
          borderRadius: 8,
          fontSize: 16
        }}
      />
      
      <TextInput
        placeholder="Create a password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          color: 'white',
          borderWidth: 1,
          borderColor: '#ccc',
          marginTop: 10,
          width: 350,
          padding: 12,
          borderRadius: 8,
          fontSize: 16
        }}
      />
      
      <TextInput
        placeholder="Confirm your password"
        placeholderTextColor="#666"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{
          color: 'white',
          borderWidth: 1,
          borderColor: '#ccc',
          marginTop: 10,
          width: 350,
          padding: 12,
          borderRadius: 8,
          fontSize: 16
        }}
      />
      
      <Pressable
        onPress={handleSignUp}
        disabled={loading}
        style={{
          backgroundColor: "#fff",
          padding: 20,
          marginTop: 20,
          borderRadius: 30,
          width: 350,
          alignItems: "center"
        }}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={{ fontSize: 18 }}>Sign Up</Text>
        )}
      </Pressable>
      
      <Pressable onPress={() => router.push("/signin")} style={{ marginTop: 15 }}>
        <Text style={{ color: "#666", textAlign: "center" }}>
          Already have an account? <Text style={{ color: "#fff" }}>Sign In</Text>
        </Text>
      </Pressable>
      
    </View>
  );
}