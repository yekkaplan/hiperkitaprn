import { showToast } from '@/components/atoms/Toast/toast';

export const handleError = (error: any, options?: {
  showToast?: boolean;
  toastDuration?: number;
  customMessage?: string;
}) => {
  const {
    showToast: shouldShowToast = true,
    toastDuration = 3000,
    customMessage
  } = options || {};

  const errorMessage = customMessage || error?.data?.message || error?.message || 'Bir hata oluştu';

  if (__DEV__) {
    console.log('Error:', error);
  }

  if (shouldShowToast) {
    showToast(errorMessage, 'error', toastDuration);
  }

  return errorMessage;
}; 