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

import AppHeaderLarge from '../../AppHeaderLarge/index.js'
import LoadingOverlay from '../../LoadingOverlay/index.js'
import * as Keychain from 'react-native-keychain'

import AppStyles from '@assets/styles'
import Images from '@assets/images'

function NameEntry(props) {
  let history = useHistory()

  const [name, setName] = useState('')

  const [formError, setFormError] = useState(false)

  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false)

  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    if (name.length > 0 && !formError) {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }, [name, formError])

  let username

  const confirmEntry = () => {
    setLoadingOverlayVisible(true)
    storeLabel(name, name)
    setTimeout(() => {
      console.log('Name Received')
      props.setSetupScreens(props.setupScreens + 1)
    }, 2000)
  }

  const storeLabel = async (username, password) => {
    await Keychain.setGenericPassword(username, password, {
      service: 'afj_label',
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={'height'}
        keyboardVerticalOffset={30}
        style={{height: '100%'}}>
        <AppHeaderLarge disabled={true} avoidKeyboard={true} />
        <View style={[AppStyles.tab, {top: 40}]}>
          <Text
            style={[
              AppStyles.h1,
              AppStyles.textPrimary,
              AppStyles.textUpper,
              AppStyles.textCenter,
              AppStyles.marginBottomMd,
            ]}>
            Business or{'\n'}Organization
          </Text>
          <View
            style={[
              AppStyles.flexView,
              AppStyles.sideMargin,
              AppStyles.spaceBetween,
              AppStyles.marginBottomSm,
            ]}>
            <Text
              style={[
                AppStyles.h3,
                AppStyles.textPrimary,
                AppStyles.textUpper,
                AppStyles.textLeft,
                {flex: 1, top: 19},
              ]}>
              Name
            </Text>
            <View style={AppStyles.labelContainer}>
              <TextInput
                style={[
                  AppStyles.formLabel,
                  formError ? AppStyles.errorForm : null,
                ]}
                value={username}
                keyboardType="default"
                onChangeText={(username) => setName(username)}
                onSubmitEditing={() => {
                  Keyboard.dismiss()
                }}
                onBlur={() => {
                  // Check that name is valid
                  if (/^[a-z, 0-9]+$/i.test(name)) {
                    // valid name
                    setFormError(false)
                  } else {
                    // invalid name
                    setFormError(true)
                  }
                }}
              />
              {formError ? (
                <Text style={[AppStyles.textSmall, AppStyles.textError]}>
                  Not a valid name
                </Text>
              ) : (
                <View style={AppStyles.formSpace} />
              )}
            </View>
          </View>
          <TouchableOpacity
            style={[AppStyles.button, AppStyles.flexView, {top: 15}]}
            disabled={isFilled ? false : true}
            onPress={() => {
              Keyboard.dismiss()
              confirmEntry()
            }}>
            <Text
              style={[
                AppStyles.h2,
                AppStyles.textUpper,
                AppStyles.textPrimary,
                isFilled ? {opacity: 1} : {opacity: 0.3},
              ]}>
              Next
            </Text>
            <View style={{width: 46}}>
              {isFilled ? (
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

export default NameEntry
