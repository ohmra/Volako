import { StyleSheet, Image, View } from 'react-native';
import React, { useRef } from 'react';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';
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
  setShowCategory: (arg: boolean) => void,
  handleInputChange: (field: string, value: string) => void
}

const CategoryBottomSheet = ({setShowCategory, handleInputChange}: categoryBottomSheetType) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const onChooseCategory = (item: itemType) => {
    handleInputChange("category", item.label);
    handleInputChange("icon", item.icon);
    setShowCategory(false);
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
            opacity={1}
            enableTouchThrough={false}
            animatedPosition={props.animatedPosition}
            animatedIndex={props.animatedIndex}
            style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0, 0, 0, 0)'}]}
            
          />
        )}
      >
        <ThemedText type="title" color="darkGray" style={styles.titleText}>
          CHOOSE CATEGORY
        </ThemedText>

        <BottomSheetFlatList
          data={categories}
          numColumns={3}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.wrapperStyle}
          renderItem={({ item }: { item: itemType }) => (
            <View style={{flex: 1/3}}>
              <TouchableOpacity style={styles.categoryContainer} 
                                onPress={() => onChooseCategory(item)}>
                <Image source={CategoryIcons[item.icon]} style={styles.icon} />
                <ThemedText>{item.label}</ThemedText>
              </TouchableOpacity>
            </View>
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
    borderWidth: 1,
    borderColor: "#9E9E9E",
  },
  titleText: {
    textAlign: 'center',
    marginVertical: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
  categoryContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  wrapperStyle: {
    justifyContent: "space-between",
    marginVertical: 24
  },
});

export default CategoryBottomSheet;
