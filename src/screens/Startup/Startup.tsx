import type { RootScreenProps } from '@/navigation/types';

import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { SafeScreen } from '@/components/templates';
import { authService } from '@/services/api/auth';
import ErrorBoundary from '@/components/organisms/ErrorBoundary/ErrorBoundary';
import { ApiError } from '@/services/api/base';
import { showToast } from '@/utils/toast';
import { Button } from '@/components/atoms/Button/Button';

function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { fonts, gutters, layout, colors } = useTheme();
  const { t } = useTranslation();

  const { mutate: createAppToken, isPending, error } = useMutation({
    mutationFn: () => authService.tokenCreate({
      username: 'halkbank',
      password: 'Halkakademi1933',
    }),
    onSuccess: (data) => {
      console.info(data);
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        showToast(error.message, 'error', 3000);
      }
    },
  });

  useEffect(() => {
    createAppToken();
  }, [createAppToken]);

  return (
    <SafeScreen>
      <ErrorBoundary
        onError={(error) => {
          console.error('Startup hata:', error);
        }}
      >
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
              style={[gutters.marginVertical_24]}
            />
          )}
          {error && (
            <Text style={[fonts.size_16, { color: 'white' }]}>
              {error instanceof ApiError ? error.message : 'Bir hata oluştu'}
            </Text>
          )}
        </View>
      </ErrorBoundary>
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
});

export default Startup;
