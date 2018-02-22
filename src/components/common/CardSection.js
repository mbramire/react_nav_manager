import React from 'react';
import { View } from 'react-native';

// Funtional component (for presentation)
const CardSection = (props) => {
  // style takes an array argument, and will used the
  // last passed in object to overide what is previously set.
  return (
    <View style={[styles.containerStyle, props.style]} >
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
