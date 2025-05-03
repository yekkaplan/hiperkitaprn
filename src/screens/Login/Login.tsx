import type { RootScreenProps } from '@/navigation/types';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Button,
  Input,
  BackButton,
  IconByVariant,
  AssetByVariant,
} from '@/components/atoms';
import { useTheme } from '@/theme';
import Icon from 'react-native-vector-icons/Feather';
import { authService } from '@/services/api/auth';
import { useMutation } from '@tanstack/react-query';
import { Paths } from '@/navigation/paths';
import { ApiError } from '@/services/api/base';
import { showToast } from '@/components/atoms/Toast/toast';
import { storage } from '@/App';
import { StorageKeys } from '@/constants/storage';
import { version } from '../../../package.json';
import { handleError } from '@/utils/errorHandler';

function Login({ navigation }: RootScreenProps<any>) {
  const { colors, fonts, gutters } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);

  const { mutate: login, isPending } = useMutation({
    mutationFn: () =>
      authService.login({
        email: email,
        password: password,
        language: 'tr',
        version: '1.0.0',
      }),
    onSuccess: (data) => {
      console.log(data);
      if (data.isSuccess) {
        storage.set(StorageKeys.TOKEN, data.token!);
        storage.set(StorageKeys.USER, JSON.stringify(data.user));
        showToast('Giriş başarılı!', 'success', 3000);
        navigation.reset({
          index: 0,
          routes: [{ name: Paths.Main }],
        });
      } else {
        showToast(data.message!, 'error', 3000);
      }
    },
    onError: (error: any) => handleError(error),
  });

  const checkInput = () => {
    if (email.length > 0 && password.length > 6) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsValidForm(checkInput());
  }, [email, password]);

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.headerRow}>
        <BackButton
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          iconColor="black"
          backgroundColor={colors.gray100}
        />
        <Text style={[fonts.bold, styles.headerTitle]}>Giriş yap</Text>
      </View>

      <View style={styles.form}>
        <Text
          style={[
            fonts.regular,
            { color: colors.gray400 },
            gutters.marginBottom_12,
          ]}
        >
          Email Adresi
        </Text>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email Adresi"
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.input}
        />
        <Text
          style={[
            fonts.regular,
            { color: colors.gray400 },
            gutters.marginBottom_12,
          ]}
        >
          Parola
        </Text>
        <View style={styles.passwordRow}>
          <View style={{ flex: 1 }}>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Parola"
              secureTextEntry={!showPassword}
              containerStyle={styles.input}
              style={{ paddingRight: 40 }}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword((v) => !v)}
              activeOpacity={0.7}
            >
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={24}
                color={colors.gray400}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setRememberMe((v) => !v)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: colors.gray200,
                  backgroundColor: rememberMe ? colors.primary : 'transparent',
                },
              ]}
            />
            <Text style={[fonts.semiBold, { color: colors.gray400 }]}>
              Beni hatırla
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* Parolamı Unuttum */
            }}
          >
            <Text style={[fonts.semiBold, { color: colors.red500 }]}>
              Parolamı Unuttum
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Giriş yap"
          //   onPress={() => login()}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: Paths.Main }],
            })
          }
          disabled={!isValidForm}
          loading={isPending}
          style={styles.loginButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButtonWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    marginRight: 60,
  },
  form: {
    width: '100%',
  },

  input: {
    marginBottom: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButton: {
    marginTop: 8,
    borderRadius: 16,
  },
});

export default Login;
