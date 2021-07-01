import React from 'react'

import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
  header: {
    height: '20%',
    paddingTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBorder: {
    borderBottomWidth: 3,
    borderColor: '#0A1C40',
  },
  logoIconBox: {
    alignItems: 'center',
    height: 150,
    width: '100%',
  },
  logoIcon: {
    position: 'absolute',
    zIndex: 10,
    height: 124,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 24,
    alignItems: 'center',
  },
  logoLine: {
    position: 'absolute',
    zIndex: 5,
    top: 65,
    width: '100%',
    height: 1,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: '#4095D4',
  },
})

export default Styles
