import React, {useState, useEffect} from 'react'

import {
  Alert,
  Image,
  Keyboard,
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

import * as Keychain from 'react-native-keychain'

import AppHeaderLarge from '../AppHeaderLarge/index.js'
import LoadingOverlay from '../LoadingOverlay/index.js'

import AppStyles from '@assets/styles'

function PinEnter(props) {
  let history = useHistory()

  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false)

  const [pin, setPin] = useState('')

  let textInput

  const checkPin = async (pin) => {
    const checker = await Keychain.getGenericPassword({service: 'passcode'})
    if (pin.length > 6) {
      Alert.alert('Pin must be 6 digits in length')
    } else if (JSON.stringify(pin) === checker.password) {
      setLoadingOverlayVisible(true)

      setTimeout(() => {
        props.setAuthenticated(true)
        history.push('/home')
      }, 2200)
    } else {
      textInput.clear()
      Alert.alert('Incorrect Pin')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={AppStyles.viewFull}>
        <AppHeaderLarge disabled={true} avoidKeyboard={true} />
        <View style={AppStyles.tab}>
          <Text
            style={[
              AppStyles.h1,
              AppStyles.textPrimary,
              AppStyles.textUpper,
              AppStyles.marginBottomLg,
            ]}>
            Welcome!
          </Text>
          <View
            style={[
              AppStyles.flexView,
              AppStyles.sideMargin,
              AppStyles.spaceBetween,
              {marginBottom: 50},
            ]}>
            <Text
              style={[
                AppStyles.h3,
                AppStyles.textPrimary,
                AppStyles.textUpper,
                AppStyles.textLeft,
                {flex: 1, top: 16},
              ]}>
              Enter Pin:
            </Text>
            <View style={{width: '58%'}}>
              <TextInput
                autoCorrect={false}
                style={[AppStyles.formLabel, AppStyles.pinLabel]}
                maxLength={6}
                keyboardType="numeric"
                secureTextEntry={true}
                value={pin}
                ref={(input) => {
                  textInput = input
                }}
                onSubmitEditing={() => {
                  checkPin(pin)
                }}
                onChangeText={(pin) => {
                  setPin(pin.replace(/[^0-9]/g, ''))
                  if (pin.length == 6) {
                    Keyboard.dismiss()
                  }
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              AppStyles.button,
              AppStyles.primaryBackground,
              {marginTop: 30},
            ]}
            onPress={() => {
              Keyboard.dismiss()
              checkPin(pin)
            }}>
            <Text style={[AppStyles.h2, AppStyles.textSecondary]}>Submit</Text>
          </TouchableOpacity>
        </View>
        {loadingOverlayVisible ? <LoadingOverlay /> : null}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PinEnter
