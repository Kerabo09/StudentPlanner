import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/styles/components/Screen.styles';

/** Full-screen container that respects device safe areas. */
export default function Screen({ children, edges = ['top'], style }) {
  return (
    <SafeAreaView edges={edges} style={[styles.screen, style]}>
      {children}
    </SafeAreaView>
  );
}
