import React, {useState, useEffect} from 'react'

import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {useHistory} from 'react-router-native'

import Config from "react-native-config"
import packageJson from '../../package.json'

import AppHeaderLarge from '../AppHeaderLarge/index.js'
import LoadingOverlay from '../LoadingOverlay/index.js'

import AppStyles from '@assets/styles'
import Images from '@assets/images'

function StartScreen(props) {
  let history = useHistory()

  return (
    <View style={AppStyles.viewFull}>
      <AppHeaderLarge disabled={true} />
      <View style={[AppStyles.tab, {top: 50}]}>
        <Text
          style={[
            AppStyles.h2,
            AppStyles.textPrimary,
            AppStyles.textCenter,
            AppStyles.textBold,
            AppStyles.marginBottomSm,
            AppStyles.lineHeightMd,
          ]}>
          Welcome!
        </Text>

        <TouchableOpacity
          style={[
            AppStyles.button,
            AppStyles.primaryBackground,
            AppStyles.marginBottomMd,
            {marginTop: 30, width: 180, borderRadius: 50},
          ]}
          onPress={() => {
            history.push('/setup-wizard')
          }}>
          <Text
            style={[
              AppStyles.h2,
              AppStyles.textSecondary,
              AppStyles.textCenter,
            ]}>
            Register{'\n'}Now
          </Text>
        </TouchableOpacity>

        {(Config.ENV === 'dev' && process.env['ENV'] !== 'prod') && 
          <Text
            style={[
            AppStyles.h3,
            AppStyles.textPrimary,
            AppStyles.textUpper,
            AppStyles.textCenter,
          ]}>
            {'\n'}Env - '{Config.ENV}' {'\n'}Version - {packageJson.version}
          </Text>
        }
      </View>
    </View>
  )
}

export default StartScreen
