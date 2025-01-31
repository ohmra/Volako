import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import ThemedText from './ThemedText';
import CategoryIcons from '@/constants/CategoryIcons';

type categoryType = keyof typeof CategoryIcons;

type itemType = {
  label: string;
  icon: categoryType;
};

const categories: Array<itemType> = [
  { label: 'Money', icon: 'Money' },
  { label: 'Gifts', icon: 'Gifts' },
  { label: 'Donate', icon: 'Donate' },
  { label: 'Institute', icon: 'Institute' },
  { label: 'Savings', icon: 'Savings' },
  { label: 'Cafe', icon: 'Cafe' },
  { label: 'Education', icon: 'Education' },
  { label: 'Electronics', icon: 'Electronics' },
  { label: 'Fuel', icon: 'Fuel' },
  { label: 'Groceries', icon: 'Groceries' },
  { label: 'Health', icon: 'Health' },
  { label: 'Institute', icon: 'Institute' },
  { label: 'Laundry', icon: 'Laundry' },
  { label: 'Liquor', icon: 'Liquor' },
  { label: 'Maintenance', icon: 'Maintenance' },
  { label: 'Party', icon: 'Party' },
  { label: 'Restaurant', icon: 'Restaurant' },
  { label: 'SelfDevelopment', icon: 'SelfDevelopment' },
  { label: 'Sport', icon: 'Sport' },
  { label: 'Transportation', icon: 'Transportation' },
];

const CategoryBottomSheets = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        backgroundStyle={styles.bottomSheet}
        snapPoints={[200, "100%"]}
      >
        <ThemedText type="title" color="darkGray" style={styles.titleText}>
          CHOOSE CATEGORY
        </ThemedText>

        {/* Use BottomSheetFlatList for scrollable content */}
        <BottomSheetFlatList
          data={categories}
          numColumns={3}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.gridGap}
          renderItem={({ item }: { item: itemType }) => (
            <TouchableOpacity style={styles.categoryContainer}>
              <Image source={CategoryIcons[item.icon]} style={styles.icon} />
              <ThemedText>{item.label}</ThemedText>
            </TouchableOpacity>
          )}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  bottomSheet: {
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
  },
  titleText: {
    textAlign: 'center',
    marginVertical: 12,
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  categoryContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    gap: 6,
    padding: 12,
  },
  icon: {
    width: 40,
    height: 40,
  },
  gridGap: {
    gap: 12,
  },
});

export default CategoryBottomSheets;
