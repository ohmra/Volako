import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CategoryBottomSheet from '../../components/CategoryBottomSheet';

const test = () => {

  // renders
  return (
    <>
      <TouchableOpacity style={styles.touchable}>
        <Text>ok</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  touchable : {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default test;