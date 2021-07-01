import React from 'react'

import {Dimensions, StyleSheet} from 'react-native'

let ScreenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  wizardView: {
    height: ScreenHeight,
  },
  dot: {
    borderRadius: 18,
    borderWidth: 1.6,
    borderStyle: 'solid',
    borderColor: '#fff',
    width: 20,
    height: 20,
    marginHorizontal: 8,
  },
  dotFilled: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  dotSmall: {
    width: 10,
    height: 10,
  },
  dotHidden: {
    display: 'none',
  },
  dotContainer: {
    alignItems: 'center',
    height: '8%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 60,
    height: 68,
  },
})

export default styles
