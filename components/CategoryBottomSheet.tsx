import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
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
  { label: 'Self Dev', icon: 'SelfDevelopment' },
  { label: 'Sport', icon: 'Sport' },
  { label: 'Transportation', icon: 'Transportation' },
];

type categoryBottomSheetType = {
  showCategory: boolean,
  setShowCategory: (arg: boolean) => void,
  handleInputChange: (field: string, value: string) => void
}

const CategoryBottomSheet = ({showCategory, setShowCategory, handleInputChange}: categoryBottomSheetType) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  useEffect(() => {
    if (showCategory) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showCategory]);

  const onChooseCategory = (item: itemType) => {
    handleInputChange("category", item.label);
    handleInputChange("icon", item.icon);
    bottomSheetRef.current?.close();
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        backgroundStyle={styles.bottomSheet}
        snapPoints={[300]}
        onClose={() => setShowCategory(false)}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}  
            appearsOnIndex={0}
            pressBehavior="close"
            opacity={0.2}
          />
        )}
      >
        <ThemedText type="title" color="darkGray" style={styles.titleText}>
          CHOOSE CATEGORY
        </ThemedText>

        <BottomSheetFlatList
          data={categories}
          numColumns={3}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.gridGap}
          renderItem={({ item }: { item: itemType }) => (
            <TouchableOpacity style={styles.categoryContainer} 
                              onPress={() => onChooseCategory(item)}>
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
    position: 'absolute',  // Ensure the bottom sheet takes the full screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    zIndex: 10
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

export default CategoryBottomSheet;
