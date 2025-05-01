import type { RootScreenProps } from '@/navigation/types';

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/theme';

import { Paths } from '@/navigation/paths';
import { BackButton } from '@/components/atoms';
import { SignInForm, InfoSection } from '@/components/molecules';
import { authService } from '@/services/api';

function SignIn({ navigation }: RootScreenProps<Paths.SignIn>) {
  const { colors, fonts, gutters, layout } = useTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password: 'your-password' });
      // Handle successful login
      console.log('Login successful:', response);
    } catch (error) {
      // Handle error
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[layout.flex_1, { backgroundColor: colors.primary }]}>
      <View style={[styles.header, gutters.paddingHorizontal_16, gutters.paddingTop_32]}>
        <BackButton onPress={handleBack} />
      </View>

      <View style={[styles.content, gutters.paddingHorizontal_24]}>
        <Text
          style={[
            styles.title,
            fonts.bold,
            { color: 'white', textAlign: 'center' },
            gutters.marginBottom_16,
          ]}
        >
          Hoş geldin!
        </Text>
        <Text
          style={[
            styles.subtitle,
            fonts.regular,
            { color: 'white', textAlign: 'center' },
            gutters.marginBottom_32,
          ]}
        >
          Üniversite e-mail adresine giriş yap.
        </Text>
      </View>

      <View style={[styles.subContainer, gutters.paddingHorizontal_24, gutters.paddingTop_32, gutters.paddingBottom_32]}>
        <SignInForm
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleSignIn}
          isLoading={isLoading}
        />
        <InfoSection />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  content: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
  },
  subContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default SignIn;
