import React, {useState, useEffect} from 'react'

import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'

import {Link} from 'react-router-native'

import AppHeaderLarge from '../AppHeaderLarge/index.js'
import LoadingOverlay from '../LoadingOverlay/index.js'

import Images from '@assets/images'
import AppStyles from '@assets/styles'
import Styles from './styles'

function Navbar(props) {
  return (
    <View style={Styles.navView}>
      <Link
        style={[Styles.navButton, {bottom: 4}]}
        component={TouchableOpacity}
        to="/workflow/connect">
        <Image source={Images.credentialIcon} style={{width: 34, height: 32}} />
        <Text style={Styles.textSmall}>Verify</Text>
      </Link>
      <Link
        style={[Styles.navButton, {bottom: 4}]}
        component={TouchableOpacity}
        to="/verifications">
        <Image source={Images.navHistory} style={{width: 34, height: 32}} />
        <Text style={Styles.textSmall}>History</Text>
      </Link>
      <Link
        style={Styles.navButton}
        component={TouchableOpacity}
        to="/settings">
        <Image source={Images.navSettings} style={{width: 28, height: 28}} />
        <Text style={Styles.textSmall}>Settings</Text>
      </Link>
    </View>
  )
}

export default Navbar
