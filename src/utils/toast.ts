import { colors } from '@/theme/colors';
import Toast from 'react-native-root-toast';

export const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' = 'info',
  duration: number = 3000
) => {

  const backgroundColor = type === 'success' 
    ? colors.success
    : type === 'error' 
      ? colors.error 
      : colors.info;

  Toast.show(message, {
    duration: duration,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor,
    textColor: '#fff',
  });
}; 