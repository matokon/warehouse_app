import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  useEffect(() => {
    const decideRoute = async () => {
      const token = await SecureStore.getItemAsync('jwt_token');
      if (!token) {
        router.replace('/(auth)/welcome');
        return;
      }
      const teamId = await SecureStore.getItemAsync('team_id');
      router.replace(teamId ? '/(tabs)/inventory' : '/jointeam');
    };

    decideRoute();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
