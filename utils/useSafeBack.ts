import { useCallback } from 'react';
import { useRouter } from 'expo-router';

/**
 * Go back if there is history, otherwise land on the home tab.
 * (A plain `router.back()` does nothing after a web refresh or a deep link into a modal.)
 */
export function useSafeBack() {
  const router = useRouter();
  return useCallback(() => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }, [router]);
}
