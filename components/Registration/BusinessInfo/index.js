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

import AppStyles from '@assets/styles'
import Images from '@assets/images'

function BusinessInfo(props) {
  let history = useHistory()

  const [info, setInfo] = useState({
    address: '',
    phone: '',
    email: '',
  })

  const [formError, setFormError] = useState({
    phone: false,
    email: false,
  })

  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false)

  const [isFilled, setIsFilled] = useState(false)

  useEffect(() => {
    if (
      info.address.length > 2 &&
      info.phone.length > 2 &&
      info.email.length > 2 &&
      !formError.phone &&
      !formError.email
    ) {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }, [info, formError])

  //empty variables for text input
  let address
  let phone
  let email

  /* empty variables to reference each text input (so that 
    hitting enter shifts focus to the next field, for example)*/
  let textInput
  let secondTextInput

  const confirmEntry = () => {
    setLoadingOverlayVisible(true)
    setTimeout(() => {
      console.log('Address Entered')
      props.setSetupScreens(props.setupScreens + 1)
    }, 2000)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={'height'}
        keyboardVerticalOffset={30}
        style={{height: '100%'}}>
        <AppHeaderLarge disabled={true} avoidKeyboard={true} />
        <View style={[AppStyles.tab, {top: 4}]}>
          <Text
            style={[
              AppStyles.h1,
              AppStyles.textPrimary,
              AppStyles.textUpper,
              AppStyles.textCenter,
              AppStyles.marginBottomMd,
            ]}>
            Organization /{'\n'}Business Info
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
                {flex: 1, top: 18},
              ]}>
              Address
            </Text>
            <View style={AppStyles.labelContainer}>
              <TextInput
                style={AppStyles.formLabel}
                value={address}
                keyboardType="default"
                onChangeText={(address) => setInfo({...info, address: address})}
                onSubmitEditing={() => {
                  textInput.focus()
                }}
              />
            </View>
          </View>
          <View
            style={[
              AppStyles.flexView,
              AppStyles.sideMargin,
              AppStyles.spaceBetween,
              AppStyles.marginBottomSm,
              {top: 8},
            ]}>
            <Text
              style={[
                AppStyles.h3,
                AppStyles.textPrimary,
                AppStyles.textUpper,
                AppStyles.textLeft,
                {flex: 1, top: 18},
              ]}>
              Phone
            </Text>
            <View style={AppStyles.labelContainer}>
              <TextInput
                style={[
                  AppStyles.formLabel,
                  formError.phone ? AppStyles.errorForm : null,
                ]}
                value={phone}
                keyboardType="phone-pad"
                onChangeText={(phone) => setInfo({...info, phone: phone})}
                ref={(input) => {
                  textInput = input
                }}
                onSubmitEditing={() => {
                  secondTextInput.focus()
                }}
                onBlur={() => {
                  // Check that phone is valid
                  if (
                    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+[0-9]{6,}$/.test(
                      info.phone,
                    )
                  ) {
                    // valid phone
                    setFormError({...formError, phone: false})
                  } else {
                    // invalid phone
                    setFormError({...formError, phone: true})
                  }
                }}
              />
              {formError.phone ? (
                <Text style={[AppStyles.textSmall, AppStyles.textError]}>
                  Not a valid phone number
                </Text>
              ) : (
                <View style={AppStyles.formSpace} />
              )}
            </View>
          </View>
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
                {flex: 1, top: 18},
              ]}>
              Email
            </Text>
            <View style={AppStyles.labelContainer}>
              <TextInput
                style={[
                  AppStyles.formLabel,
                  {fontSize: 14},
                  formError.email ? AppStyles.errorForm : null,
                ]}
                value={email}
                keyboardType="email-address"
                onChangeText={(email) => setInfo({...info, email: email})}
                ref={(input) => {
                  secondTextInput = input
                }}
                onSubmitEditing={() => {
                  if (isFilled) {
                    Keyboard.dismiss()
                    confirmEntry()
                  } else {
                    Keyboard.dismiss()
                  }
                }}
                onBlur={() => {
                  // Check that email is valid
                  if (/(.+)@(.+){2,}\.(.+){2,}/.test(info.email)) {
                    // valid email
                    setFormError({...formError, email: false})
                  } else {
                    // invalid email
                    setFormError({...formError, email: true})
                  }
                }}
              />
              {formError.email ? (
                <Text style={[AppStyles.textSmall, AppStyles.textError]}>
                  Email address is not valid
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
                isFilled ? AppStyles.textPrimary : {color: '#bbb'},
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

export default BusinessInfo
