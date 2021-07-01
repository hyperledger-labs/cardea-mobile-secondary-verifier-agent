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

import * as Keychain from 'react-native-keychain'

import AppHeaderLarge from '../../AppHeaderLarge/index.js'
import LoadingOverlay from '../../LoadingOverlay/index.js'

import AppStyles from '@assets/styles'
import Images from '@assets/images'

function PinCreate(props) {
  let history = useHistory()

  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false)

  const [pin, setPin] = useState('')
  const [pinTwo, setPinTwo] = useState('')

  const [pinsComplete, setPinsComplete] = useState('')

  let textInput
  let secondTextInput

  const passcodeCreate = async (x) => {
    const passcode = JSON.stringify(x)
    const description = 'user authentication pin'
    await Keychain.setGenericPassword(description, passcode, {
      service: 'passcode',
    })
  }

  const confirmEntry = (x, y) => {
    if (x !== y) {
      textInput.clear()
      secondTextInput.clear()
      setPin('')
      setPinTwo('')
      Alert.alert('Pins entered do not match')
    } else {
      passcodeCreate(x)
      setLoadingOverlayVisible(true)
      setTimeout(() => {
        console.log('Pin Create Change')
        props.setSetupScreens(props.setupScreens + 1)
      }, 2000)
    }
  }

  useEffect(() => {
    if (pin.length == 6 && pinTwo.length == 6) {
      setPinsComplete(true)
    } else {
      setPinsComplete(false)
    }
  }, [pin, pinTwo])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={'height'}
        keyboardVerticalOffset={20}
        style={{height: '100%'}}>
        <AppHeaderLarge disabled={true} avoidKeyboard={true} />
        <View style={AppStyles.tab}>
          <Text
            style={[
              AppStyles.h1,
              AppStyles.textPrimary,
              AppStyles.textUpper,
              AppStyles.textCenter,
              AppStyles.marginBottomMd,
              AppStyles.lineHeightMd,
            ]}>
            First,{'\n'}Choose a Pin
          </Text>
          <View
            style={[
              AppStyles.flexView,
              AppStyles.sideMargin,
              AppStyles.spaceBetween,
              AppStyles.marginBottomMd,
            ]}>
            <Text
              style={[
                AppStyles.h3,
                AppStyles.textPrimary,
                AppStyles.textUpper,
                AppStyles.textLeft,
                {flex: 1},
              ]}>
              Choose{'\n'}6-digit pin
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
                  secondTextInput.focus()
                }}
                blurOnSubmit={false}
                onChangeText={(pin) => {
                  setPin(pin.replace(/[^0-9]/g, ''))
                  if (pin.length == 6) {
                    secondTextInput.focus()
                  }
                }}
              />
            </View>
          </View>
          <View
            style={[
              AppStyles.flexView,
              AppStyles.sideMargin,
              AppStyles.spaceBetween,
            ]}>
            <Text
              style={[
                AppStyles.h3,
                AppStyles.textPrimary,
                AppStyles.textUpper,
                AppStyles.textLeft,
                {flex: 1},
              ]}>
              Re-Enter{'\n'}Pin
            </Text>
            <View style={{width: '58%'}}>
              <TextInput
                autoCorrect={false}
                style={[AppStyles.formLabel, AppStyles.pinLabel]}
                maxLength={6}
                keyboardType="numeric"
                secureTextEntry={true}
                value={pinTwo}
                ref={(input) => {
                  secondTextInput = input
                }}
                onSubmitEditing={() => {
                  confirmEntry(pin, pinTwo)
                }}
                onChangeText={(pinTwo) => {
                  setPinTwo(pinTwo.replace(/[^0-9]/g, ''))
                  if (pinTwo.length == 6) {
                    Keyboard.dismiss()
                  }
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[AppStyles.button, AppStyles.flexView, {top: 15}]}
            disabled={pinsComplete ? false : true}
            onPress={() => {
              Keyboard.dismiss()
              confirmEntry(pin, pinTwo)
            }}>
            <Text
              style={[
                AppStyles.h2,
                AppStyles.textUpper,
                AppStyles.textPrimary,
                pinsComplete ? {opacity: 1} : {opacity: 0.3},
              ]}>
              Next
            </Text>
            <View style={{width: 46}}>
              {pinsComplete ? (
                <Image source={Images.arrow} style={{marginLeft: 20}} />
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
        {loadingOverlayVisible ? <LoadingOverlay /> : null}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default PinCreate
