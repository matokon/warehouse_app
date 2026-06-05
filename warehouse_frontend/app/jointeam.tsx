import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Modal, TextInput, ActivityIndicator, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api from '../src/services/api';

export default function jointeam() {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!code) return;
    setLoading(true);
    try {
      const res = await api.post('/teams/join', { access_code: code });
      await SecureStore.setItemAsync('team_id', String(res.data.id));
      router.replace('/(tabs)/inventory');
    } catch (e) {
      Alert.alert('Error', 'Invalid team code');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 24, paddingVertical: 55}}>
        <Text style={{ color: '#fff', fontSize: 11, fontWeight: 600, paddingBottom: 10}}>Set up your team</Text>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 700, paddingBottom: 5 }}>Work with your crew</Text>
        <Text style={{ color: '#8e8e93', fontSize: 15, fontWeight: 400, paddingBottom: 35}}>Share one inventory across everyone on the floor.</Text>
        <Pressable 
        onPress={() => router.replace()} 
        style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#1e1e22',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#1f1f24',
          paddingHorizontal: 16,
          minHeight: 110,
          margin:12,
          alignSelf: 'stretch'
         }}>
          <IconSymbol size={25} name="person.2" color="white"  />
          <View style={{ flexDirection: 'column', flex: 1, marginLeft: 20 }}>
          <Text style={{ color: '#f5f5f7', fontSize: 16, fontWeight: 600}}>Create new team</Text>
          <Text style={{ color: '#8e8e93', fontSize: 13, fontWeight: 400}}>Start fresh and invite your warehouse crew</Text>
          </View>
          <IconSymbol size={20} name="chevron.right" color="#5a5a60" />
        </Pressable>
        <Pressable 
        onPress={() => setVisible(true)} 
        style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#1e1e22',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#1f1f24',
          paddingHorizontal: 16,
          minHeight: 110,
          marginHorizontal:10,
          alignSelf: 'stretch'
         }}>
          <IconSymbol size={25} name="plus" color="white"  />
          <View style={{ flexDirection: 'column', flex: 1, marginLeft: 20}}>
          <Text style={{ color: '#f5f5f7', fontSize: 16, fontWeight: 600}}>Join with a code</Text>
          <Text style={{ color: '#8e8e93', fontSize: 13, fontWeight: 400}}>Use an invite code from a teammate</Text>
          </View>
          <IconSymbol size={20} name="chevron.right" color="#5a5a60" />
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setVisible(!visible);
          }}>
          <Pressable
              onPress={() => setVisible(false)}
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}
            >
              <Pressable
                onPress={() => {}}
                style={{ width: '85%', backgroundColor: '#1e1e22', borderRadius: 16, padding: 24 }}
              >
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Join a team</Text>

                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="ABC123"
                  placeholderTextColor="#5a5a60"
                  autoCapitalize="characters"
                  maxLength={6}
                  style={{ color: '#fff', backgroundColor: '#0a0a0a', borderRadius: 10, padding: 14, marginBottom: 16 }}
                />

                <Pressable
                  onPress={handleJoin}
                  disabled={loading}
                  style={{ backgroundColor: '#f5f5f7', borderRadius: 12, height: 50, alignItems: 'center', justifyContent: 'center' }}
                >
                  {loading ? <ActivityIndicator /> : <Text style={{ fontWeight: '600' }}>Join</Text>}
                </Pressable>
              </Pressable>
            </Pressable>
        </Modal>
    </SafeAreaView>
  );
}