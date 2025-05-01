import type { RootScreenProps } from '@/navigation/types';

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

function SignIn({ navigation }: RootScreenProps<Paths.SignIn>) {
  const { colors, fonts, gutters, layout } = useTheme();
  const [email, setEmail] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSignIn = () => {
    // TODO: Implement sign in logic
  };

  return (
    <SafeAreaView style={[layout.flex_1, { backgroundColor: colors.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" color="white" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            fonts.bold,
            { color: 'white', textAlign: 'center' },
          ]}
        >
          Hoş geldin!
        </Text>
        <Text
          style={[
            styles.subtitle,
            fonts.regular,
            { color: 'white', textAlign: 'center' },
          ]}
        >
          Üniversite e-mail adresine giriş yap.
        </Text>
      </View>

      <View style={styles.subContainer}>
        <View
          style={[styles.inputContainer, { backgroundColor: colors.gray50 }]}
        >
          <TextInput
            style={[styles.input, fonts.regular]}
            placeholder="E-mail adresini yaz"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSignIn}
        >
          <Text style={[fonts.semiBold, { color: 'white' }]}>Hemen başla!</Text>
        </TouchableOpacity>

        <View style={[styles.infoContainer, gutters.marginTop_32]}>
          <Text style={[styles.infoText, fonts.regular, { color: colors.gray200 }]}>
            Kurumunuz Hiperkitap'a abone ise, tüm içeriklerden ücretsiz
            faydalanabilirsiniz!
          </Text>
          <Text
            style={[
              styles.infoText,
              fonts.regular,
              { marginTop: 24, color: colors.gray200 },
            ]}
          >
            Tek yapmanız gereken, kurum e-posta adresinizle (örneğin,
            xyz.edu.tr) üye olmak.
          </Text>
          <Text
            style={[
              styles.infoText,
              fonts.regular,
              { marginTop: 24, color: colors.gray200 },
            ]}
          >
            Peki, kurumunuz abone mi? Öğrenmek için{' '}
            <Text
              style={[
                fonts.semiBold,
                { color: colors.primary, textDecorationLine: 'underline' },
              ]}
            >
              abone kurumlar
            </Text>{' '}
            sayfasına göz atın ve hemen kaydolarak bilgi dünyasının kapılarını
            aralayın!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 32,
    flexDirection: 'row',
  },
  backButton: {
    width: 60,
    height: 60,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  subContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SignIn;
