import React, {useState, useEffect, useContext} from 'react'

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {useHistory, useLocation} from 'react-router-native'

import AppHeaderLarge from '../AppHeaderLarge/index.js'
import AppHeader from '../AppHeader/index.js'
import BackButton from '../BackButton/index.js'
import LoadingOverlay from '../LoadingOverlay/index.js'

import {ErrorsContext} from '../Errors/index.js'
import {NotificationsContext} from '../Notifications/index.js'

import AppStyles from '@assets/styles'
import Images from '@assets/images'
import Styles from './styles'

function Home() {
  let history = useHistory()
  let location = useLocation()

  const mockItems = [1, 2, 3]

  const errors = useContext(ErrorsContext)
  const notifications = useContext(NotificationsContext)

  return (
    <>
      <BackButton backExit={true} />
      <View style={AppStyles.viewFull}>
        <AppHeaderLarge disabled={true} />
        <View style={AppStyles.tab}>
          <Text
            style={[
              AppStyles.h1,
              AppStyles.textSecondary,
              AppStyles.textBold,
              AppStyles.textItalic,
              AppStyles.textUpper,
            ]}>
            {' '}
            Verify{' '}
          </Text>
          <Text
            style={[
              AppStyles.textPrimary,
              AppStyles.textCenter,
              Styles.verifyText,
            ]}>
            Tap Verify{'\n'} To Display QR Code{'\n'}Allow Customer to Scan
          </Text>
          <TouchableOpacity
            onPress={() => {
              /*errors.setVisible(true)
            errors.setText("Workflows not\nyet created")
            errors.setPath("/home")*/
              history.push('/workflow/connect')
            }}>
            <Image source={Images.credentialLarge} style={Styles.verifyIcon} />
            <Text
              style={[
                AppStyles.textPrimary,
                AppStyles.h3,
                AppStyles.textBold,
                AppStyles.textUpper,
                {top: 6},
              ]}>
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default Home
