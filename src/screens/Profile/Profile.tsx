import { SafeScreen } from '@/components/templates';
import { useAuth } from '@/context/AuthContext';
import { View, Text, Button } from 'react-native';

export default function Profile() {
  const { logout } = useAuth();

  return (
    <SafeScreen>
      <Text>Profile Screen</Text>

      <Button title="Logout" onPress={() => logout()} />
    </SafeScreen>
  );
}
