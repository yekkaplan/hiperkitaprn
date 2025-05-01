import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Input } from '@/components/atoms';
import { Button } from '@/components/atoms';

interface SignInFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  style?: ViewStyle;
}

export const SignInForm = ({ email, onEmailChange, onSubmit, style }: SignInFormProps) => {
  const { gutters } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Input
        placeholder="E-mail adresini yaz"
        value={email}
        onChangeText={onEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={gutters.marginBottom_16}
      />
      <Button
        title="Hemen başla!"
        onPress={onSubmit}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
}); 