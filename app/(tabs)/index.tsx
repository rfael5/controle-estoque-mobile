import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import ProductsTable from '../../components/ProductsTable';

export default function HomeScreen() {

  return (
      <ThemedView style={styles.titleContainer}>
        <ProductsTable></ProductsTable>
      </ThemedView>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor:'none',
    marginTop:30,
    padding:7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
});
