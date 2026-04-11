import { View, Text, Image, ScrollView, TextInput, Button, Pressable } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: 'white', fontSize: 60 }}>Welcome</Text>
    <Text style={{ color: '#888', fontSize: 18, textAlign: 'center', marginTop: 2, marginBottom: 30 }}>
    Manage your warehouse easily
    </Text>

    <Pressable
        style={{ backgroundColor: "#ffffffff",
                  padding: 20,
                  borderRadius: 30,
                  width: 350,
                  alignItems: "center" }}
        onPress={() => router.push("/signup")}
      >
        <Text style={{ fontSize: 18 }}>Sign up</Text>
    </Pressable>

    <Pressable
        style={{ backgroundColor: "#302f32",
                  padding: 20,
                  borderRadius: 30,
                  marginTop: 10,
                  width: 350,
                  alignItems: "center" }}
        onPress={() => router.push("/signin")}
      >
        <Text style={{ fontSize: 18, color: 'white' }}>Log in</Text>
    </Pressable>
  </View>
  );
}
