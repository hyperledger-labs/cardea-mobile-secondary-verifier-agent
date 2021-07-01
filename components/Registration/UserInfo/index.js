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

import RNPickerSelect from 'react-native-picker-select'

import AppHeaderLarge from '../../AppHeaderLarge/index.js'
import LoadingOverlay from '../../LoadingOverlay/index.js'

import AppStyles from '@assets/styles'
import Images from '@assets/images'

function UserInfo(props) {
  let history = useHistory()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    gender: null,
    birthDate: '',
  })

  const pickerStyle = {
    inputAndroid: {
      width: 196,
      marginLeft: 34,
      height: 45,
      backgroundColor: '#eee',
    },
  }

  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false)

  const [isFilled, setIsFilled] = useState(false)
  const [dobFormat, setDobFormat] = useState(false)

  useEffect(() => {
    if (
      user.firstName.length > 2 &&
      user.lastName.length > 2 &&
      user.gender &&
      dobFormat
    ) {
      setIsFilled(true)
    }
  }, [user])

  /* seajensen: Function to check DOB format and give feedback */
  const DOBCheck = () => {
    if (user.birthDate != undefined) {
      let dobSplit = user.birthDate.split('/')
      if (
        user.birthDate.length == 10 &&
        dobSplit[0].length == 2 &&
        dobSplit[1].length == 2 &&
        dobSplit[2].length == 4 &&
        13 > parseInt(dobSplit[0]) > 0 &&
        32 > parseInt(dobSplit[1]) > 0 &&
        parseInt(dobSplit[2]) > 1900
      ) {
        setDobFormat(true)
      } else {
        setDobFormat(false)
        thirdTextInput.clear()
        Alert.alert('Date of Birth must follow MM/DD/YYYY format')
      }
    }
  }

  let firstName
  let lastName
  let birthDate

  let textInput
  let secondTextInput
  let thirdTextInput

  const confirmEntry = () => {
    setLoadingOverlayVisible(true)
    setTimeout(() => {
      console.log('User Info Accepted')
      setLoadingOverlayVisible(false)
      props.setSetupScreens(props.setupScreens + 1)
    }, 2000)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={'height'}
        keyboardVerticalOffset={30}
        style={AppStyles.windowFull}>
        <AppHeaderLarge disabled={true} avoidKeyboard={true} />
        <View style={AppStyles.tab}>
          <View
            style={[
              AppStyles.flexView,
              AppStyles.barBlue,
              AppStyles.marginBottomMd,
            ]}>
            <Text
              style={[
                AppStyles.h3,
                AppStyles.textPrimary,
                AppStyles.textCenter,
              ]}>
              <Text style={AppStyles.textBold}>Visitor</Text> who is{' '}
              <Text style={AppStyles.textBold}>traveling</Text>
            </Text>
          </View>
          <View
            style={[
              AppStyles.flexView,
              AppStyles.sideMargin,
              AppStyles.marginBottomSm,
              AppStyles.spaceBetween,
            ]}>
            <Text
              style={[
                AppStyles.h3,
                AppStyles.textPrimary,
                AppStyles.textUpper,
                AppStyles.textLeft,
                {flex: 1, top: 19},
              ]}>
              First Name
            </Text>
            <TextInput
              style={AppStyles.formLabel}
              value={firstName}
              onChangeText={(firstName) =>
                setUser({...user, firstName: firstName})
              }
              ref={(input) => {
                textInput = input
              }}
              onSubmitEditing={() => {
                secondTextInput.focus()
              }}
            />
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
                {flex: 1, top: 19},
              ]}>
              Last Name
            </Text>
            <TextInput
              style={AppStyles.formLabel}
              value={lastName}
              onChangeText={(lastName) =>
                setUser({...user, lastName: lastName})
              }
              ref={(input) => {
                secondTextInput = input
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss()
              }}
            />
          </View>
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
                {flex: 1, top: 8},
              ]}>
              Gender
            </Text>
            <RNPickerSelect
              style={pickerStyle}
              onValueChange={(value) => {
                setUser({...user, gender: value})
              }}
              onOpen={() => Keyboard.dismiss()}
              items={[
                {label: 'Male', value: 'male'},
                {label: 'Female', value: 'female'},
              ]}
            />
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
                {flex: 1, top: 12},
              ]}>
              Date of{'\n'}Birth
            </Text>
            <TextInput
              style={[AppStyles.formLabel, {textAlign: 'left'}]}
              value={birthDate}
              placeholder={'MM/DD/YYYY'}
              keyboardType="phone-pad"
              onChangeText={(birthDate) => {
                setUser({...user, birthDate: birthDate})
              }}
              ref={(input) => {
                thirdTextInput = input
              }}
              onSubmitEditing={() => {
                DOBCheck()
                Keyboard.dismiss()
              }}
              onBlur={() => {
                DOBCheck()
                setUser({...user, birthDate: birthDate})
              }}
            />
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

export default UserInfo
