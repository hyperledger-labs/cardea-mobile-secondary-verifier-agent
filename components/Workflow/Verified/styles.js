import React from 'react'

import {StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
  tabView: {
    paddingLeft: '7%',
    paddingRight: '5%',
    top: 0,
    flex: 0,
  },
  h1: {
    fontSize: 42,
  },
  tableHeader: {
    backgroundColor: '#A7A1A1',
    width: '100%',
    paddingHorizontal: '4%',
    paddingVertical: 6,
  },
  table: {
    backgroundColor: '#EAEAEA',
    width: '100%',
    paddingHorizontal: '4%',
    paddingVertical: 6,
  },
  tableWrap: {
    marginTop: 0,
    flex: 1,
  },
  textItem: {
    fontSize: 18,
    paddingBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    paddingVertical: 7,
  },
  tableItem: {
    borderColor: '#fff',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    height: 40,
    marginTop: 4,
    justifyContent: 'center',
  },
  approvedIcon: {
    width: 120,
    height: 122,
    right: 14,
  },
  notApprovedIcon: {
    width: 110,
    height: 120,
    right: 18,
  },
  approvedArrow: {
    right: 75,
  },
  notApprovedArrow: {
    right: 90,
  },
})

export default Styles
