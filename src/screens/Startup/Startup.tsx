import type { RootScreenProps } from '@/navigation/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View, Image, StyleSheet } from 'react-native';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { authService } from '@/services/api/auth';
import { ApiError } from '@/services/api/base';
import { showToast } from '@/components/atoms/Toast/toast';
import { storage } from '@/App';

function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { fonts, colors } = useTheme();

  const { mutate: createAppToken, isPending } = useMutation({
    mutationFn: () => authService.tokenCreate({
      username: 'halkbank',
      password: 'Halkakademi1933',
    }),
    onSuccess: (data) => {
      storage.set('appToken', JSON.stringify(data.token));
      navigation.navigate(Paths.Onboarding);
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        showToast(error.message, 'error', 3000);
      }
    },
  });

  useEffect(() => {
    const token = storage.getString('appToken');
    if (token) {
      navigation.navigate(Paths.Onboarding);
    } else {
      createAppToken();
    }
  }, [createAppToken]);

  return (
    <SafeScreen>
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <View style={styles.content}>
          <Image
            source={require('@/theme/assets/images/hiperkitap-logo-white.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, fonts.bold, fonts.size_16]}>
            Türkiye'nin İlk ve En Büyük{'\n'}Dijital Kütüphanesi
          </Text>
        </View>

        {isPending && (
          <ActivityIndicator
            size="large"
            color="white"
            style={styles.loader}
          />
        )}
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 40,
    marginBottom: 16,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  loader: {
    marginVertical: 24,
  },
});

export default Startup;
