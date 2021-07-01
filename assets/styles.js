import React from 'react'

import {Dimensions, StyleSheet} from 'react-native'

let ScreenHeight = Dimensions.get('window').height

const primaryColor = '#fff'
const secondaryColor = '#f4c994'
const tertiaryColor = '#677758'
const errorColor = '#BC0F00'
const confirmColor = '#839B46'

const Styles = StyleSheet.create({
  primaryBackground: {
    backgroundColor: primaryColor,
  },
  secondaryBackground: {
    backgroundColor: secondaryColor,
  },
  errorBackground: {
    backgroundColor: errorColor,
  },
  confirmBackground: {
    backgroundColor: confirmColor,
  },
  tertiaryBackground: {
    backgroundColor: tertiaryColor,
  },
  textPrimary: {
    color: primaryColor,
  },
  textSecondary: {
    color: secondaryColor,
  },
  textError: {
    color: errorColor,
  },
  textConfirm: {
    color: confirmColor,
  },
  viewFull: {
    height: '100%',
    backgroundColor: secondaryColor,
  },
  windowFull: {
    height: ScreenHeight,
    backgroundColor: secondaryColor,
  },
  flexView: {
    display: 'flex',
    flexDirection: 'row',
  },
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 22,
    textAlign: 'center',
  },
  textUpper: {
    textTransform: 'uppercase',
  },
  textGray: {
    color: '#999',
  },
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textItalic: {
    fontStyle: 'italic',
  },
  marginBottomSm: {
    marginBottom: 15,
  },
  marginBottomMd: {
    marginBottom: 30,
  },
  marginBottomLg: {
    marginBottom: 80,
  },
  lineHeightMd: {
    lineHeight: 48,
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  barBlue: {
    backgroundColor: '#C2D1ED',
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  pinTab: {
    alignItems: 'center',
    backgroundColor: '#f4c257',
    height: '100%',
  },
  sideMargin: {
    marginHorizontal: 20,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  formLabel: {
    height: 46,
    width: '100%',
    borderBottomWidth: 1.5,
    borderRadius: 1,
    textAlign: 'left',
    borderColor: '#fff',
    fontSize: 22,
    color: '#fff',
  },
  labelContainer: {
    width: '68%',
  },
  formSpace: {
    height: 16,
  },
  errorForm: {
    borderColor: errorColor,
  },
  pinLabel: {
    letterSpacing: 16,
  },
  button: {
    marginVertical: 7,
    minWidth: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  whiteTab: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  tableItem: {
    borderBottomWidth: 1.2,
    borderColor: primaryColor,
    height: 70,
    width: '115%',
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    height: 20,
    width: 42,
  },
  info: {
    width: 25,
    height: 25,
  },
  credential: {
    width: 41,
    height: 42,
  },
  contact: {
    width: 100,
    height: 27,
  },
  backArrow: {
    width: 30,
    height: 55,
    top: 120,
    right: 25,
  },
  rotate90: {
    transform: [{rotate: '90deg'}],
  },
})

export default Styles
