import type { RootScreenProps } from '@/navigation/types';

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

function Login({ navigation }: RootScreenProps<Paths.Login>) {
  const { colors, fonts } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Text style={[styles.text, fonts.bold]}>Login Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default Login; 