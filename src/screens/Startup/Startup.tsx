import type { RootScreenProps } from '@/navigation/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useCallback, useRef, memo } from 'react';
import { ActivityIndicator, Text, View, Image, StyleSheet } from 'react-native';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import { authService } from '@/services/api/auth';
import { ApiError } from '@/services/api/base';
import { showToast } from '@/components/atoms/Toast/toast';
import { storage } from '@/App';
import { StorageKeys } from '@/constants/storage';
import { useAuth } from '@/context/AuthContext';

const Startup = memo(function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { fonts, colors } = useTheme();
  const { isAuthenticated } = useAuth();
  const isNavigating = useRef(false);
  const hasCreatedToken = useRef(false);

  const navigateWithAppTokenAndIsAuthenticated = useCallback(() => {
    if (isNavigating.current) return;
    
    console.log('Navigating based on auth state:', { isAuthenticated });
    isNavigating.current = true;

    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Main }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.AuthStack }],
      });
    }
  }, [navigation, isAuthenticated]);

  const { mutate: createAppToken, isPending } = useMutation({
    mutationFn: () =>
      authService.tokenCreate({
        username: 'halkbank',
        password: 'Halkakademi1933',
      }),
    onSuccess: (data) => {
      console.log('App token created successfully:', data);
      if (data.token) {
        storage.set(StorageKeys.APP_TOKEN, data.token);
        navigateWithAppTokenAndIsAuthenticated();
      } else {
        showToast('App token oluşturulamadı', 'error', 3000);
      }
    },
    onError: (error) => {
      console.error('App token creation error:', error);
      if (error instanceof ApiError) {
        showToast(error.message, 'error', 3000);
      }
    },
  });

  useEffect(() => {
    if (!hasCreatedToken.current) {
      hasCreatedToken.current = true;
      console.log('Creating new app token...');
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
          <ActivityIndicator size="large" color="white" style={styles.loader} />
        )}
      </View>
    </SafeScreen>
  );
});

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
