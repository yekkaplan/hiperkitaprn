import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { InfoText } from '@/components/atoms';

interface InfoSectionProps {
  style?: ViewStyle;
}

export const InfoSection = ({ style }: InfoSectionProps) => {
  const { colors, fonts, gutters } = useTheme();

  return (
    <View style={[styles.container, gutters.marginTop_32, style]}>
      <InfoText
        text="Kurumunuz Hiperkitap'a abone ise, tüm içeriklerden ücretsiz faydalanabilirsiniz!"
      />
      <InfoText
        text="Tek yapmanız gereken, kurum e-posta adresinizle (örneğin, xyz.edu.tr) üye olmak."
      />
      <InfoText
        text={
          <>
            Peki, kurumunuz abone mi? Öğrenmek için{' '}
            <Text
              style={[
                fonts.bold,
                { color: colors.primary, textDecorationLine: 'underline' },
              ]}
            >
              abone kurumlar
            </Text>{' '}
            sayfasına göz atın ve hemen kaydolarak bilgi dünyasının kapılarını
            aralayın!
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 