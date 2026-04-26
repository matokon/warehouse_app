import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import api from "../../src/services/api";
import * as SecureStore from 'expo-secure-store';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
  if(!email || !password) {
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

      router.replace("/home");
    } catch (error: any) {
      console.error("Log error:", error.response?.data);
      Alert.alert("Error", "Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "black" }}>
      <Text>Welcome back</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
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
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{
          color: 'white',
          borderWidth: 1,
          marginTop: 10,
          borderColor: '#ccc',
          width: 350,
          padding: 12,
          borderRadius: 8,
          fontSize: 16
      }}
      />
      <Pressable
              onPress={handleSignIn}
              disabled={loading}
              style={{ backgroundColor: "#ffffffff",
                        padding: 20,
                        marginTop: 5,
                        borderRadius: 30,
                        width: 350,
                        alignItems: "center" }}
            >
              <Text style={{ fontSize: 18 }}>Sign in</Text>
      </Pressable>
    </View>
  );
}