import React, {useState, useEffect} from 'react'

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {useHistory} from 'react-router-native'

import AppHeaderLarge from '../AppHeaderLarge/index.js'
import LoadingOverlay from '../LoadingOverlay/index.js'

import Images from '@assets/images'
import AppStyles from '@assets/styles'
import Styles from './styles'

function Message(props) {
  let history = useHistory()

  return (
    <View style={Styles.msgView}>
      <View style={[Styles.innerView, props.bgColor]}>
        {props.children}
        {props.title ? (
          <Text
            style={[
              AppStyles.h2,
              AppStyles.textBold,
              AppStyles.textCenter,
              {marginTop: 25},
              props.textLight ? AppStyles.textSecondary : AppStyles.textPrimary,
            ]}>
            {props.title}
            {'\n'}
          </Text>
        ) : null}
        {props.text ? (
          <Text
            style={[
              Styles.msgText,
              props.textLight ? AppStyles.textSecondary : AppStyles.textPrimary,
            ]}>
            {props.text}
            {'\n'}
          </Text>
        ) : null}
        {props.path ? (
          <TouchableOpacity
            style={[
              AppStyles.button,
              AppStyles.confirmBackground,
              {marginTop: 30},
            ]}
            onPress={() => history.push(props.path)}>
            <Text style={[AppStyles.h2, AppStyles.textSecondary]}>
              Continue
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

export default Message
