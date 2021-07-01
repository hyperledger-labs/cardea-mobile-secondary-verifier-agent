import React, {useState, useEffect} from 'react'

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {Prompt, useHistory} from 'react-router-native'

import Images from '@assets/images'
import AppStyles from '@assets/styles'
import Styles from './styles'

function AppHeader(props) {
  let history = useHistory()

  return (
    <TouchableWithoutFeedback
      disabled={props.disabled ? true : false}
      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      onPress={() => {
        history.push('/home')
      }}>
      <View style={Styles.header}>
        <View style={Styles.logoIconBox}>
          <View style={[Styles.logoIcon, AppStyles.secondaryBackground]}>
            <Image style={{width: 125, height: 95}} source={Images.logo} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AppHeader
