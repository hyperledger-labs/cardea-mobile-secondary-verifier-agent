import React, {useState, useEffect, useContext} from 'react'
import {ProofState, PresentationMessage, JsonTransformer} from 'aries-framework'

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Styles from '../styles'
import AppStyles from '@assets/styles'
import Images from '@assets/images'

function VerificationItem(props) {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <View
        key={props.key}
        style={[
          AppStyles.tableItem,
          Styles.tableItem,
          props.background,
          props.curr.isVerified ? {justifyContent: 'space-between'} : null,
        ]}>
        <Text style={[{fontSize: 18}, AppStyles.textPrimary]}>
          {props.label}
        </Text>
        {props.curr.isVerified ? (
          <TouchableOpacity
            onPress={() => {
              setToggle(!toggle)
            }}>
            <Image source={Images.infoWhite} style={AppStyles.info} />
          </TouchableOpacity>
        ) : null}
      </View>
      {toggle ? (
        <View style={Styles.subTable}>
          {Object.entries(props.curr.attributes).map(([key, val]) => {
            return (
              <View style={Styles.subItem}>
                <Text>{key}: </Text>
                <Text>{val}</Text>
              </View>
            )
          })}
        </View>
      ) : null}
    </>
  )
}

export default VerificationItem
