import React from 'react'

import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  window: {
    flex: 1,
    backgroundColor: '#6d6d6d',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingTop: 25,
  },
  tableItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'center',
    textAlign: 'center',
    borderBottomWidth: 0,
    borderRadius: 5,
  },
  proofView: {
    alignItems: 'center',
    width: '92%',
    marginHorizontal: '4%',
  },
  subTable: {
    backgroundColor: '#ccc',
    width: '98%',
    top: -5,
  },
  subItem: {
    width: '100%',
    paddingHorizontal: '4%',
    paddingVertical: '1%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})

export default styles
