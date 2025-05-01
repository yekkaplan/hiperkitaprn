import type { RootScreenProps } from '@/navigation/types';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View, Image, StyleSheet } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { SafeScreen } from '@/components/templates';

function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { fonts, gutters, layout, colors } = useTheme();
  const { t } = useTranslation();

  const { isError, isFetching, isSuccess } = useQuery({
    queryFn: () => {
      return Promise.resolve(true);
    },
    queryKey: ['startup'],
  });

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Onboarding }],
      });
    }
  }, [isSuccess, navigation]);

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
        {isFetching && (
          <ActivityIndicator 
            size="large" 
            color="white" 
            style={[gutters.marginVertical_24]} 
          />
        )}
        {isError && (
          <Text style={[fonts.size_16, { color: 'white' }]}>
            {t('common_error')}
          </Text>
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
});

export default Startup;
