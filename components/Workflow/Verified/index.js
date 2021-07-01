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

import {useHistory} from 'react-router-native'

import AppHeaderLarge from '../../AppHeaderLarge/index.js'
import BackButton from '../../BackButton/index.js'

import {ErrorsContext} from '../../Errors/index.js'
import {NotificationsContext} from '../../Notifications/index.js'

import Images from '@assets/images'
import AppStyles from '@assets/styles'
import Styles from './styles'

function Verified(props) {
  let history = useHistory()

  const [dropdown, setDropdown] = useState(false)
  const [approved, setApproved] = useState(true)

  const errors = useContext(ErrorsContext)
  const notifications = useContext(NotificationsContext)

  return (
    <>
      <BackButton backPath={'/workflow/connect'} />
      <View
        style={[AppStyles.viewFull, {paddingTop: 10, flexDirection: 'column'}]}>
        <AppHeaderLarge logo={true} />
        <View style={[AppStyles.tab, Styles.tabView]}>
          <Text
            style={[
              AppStyles.h2,
              AppStyles.textPrimary,
              AppStyles.textBold,
              AppStyles.textItalic,
              AppStyles.marginBottomSm,
            ]}>
            {' '}
            Credential Verified{' '}
          </Text>
          <View style={[AppStyles.flexView, {justifyContent: 'center'}]}>
            <TouchableOpacity
              hitSlop={{top: 20, bottom: 20, left: 60, right: 20}}
              onPress={() => history.push('/home')}>
              <Image
                source={Images.arrowLeft}
                style={[
                  AppStyles.backArrow,
                  {top: 30},
                  props.approved
                    ? Styles.approvedArrow
                    : Styles.notApprovedArrow,
                ]}
              />
            </TouchableOpacity>
            <Image
              source={
                props.approved ? Images.credentialLarge : Images.notApproved
              }
              style={
                props.approved ? Styles.approvedIcon : Styles.notApprovedIcon
              }
            />
          </View>
          <Text
            style={[
              AppStyles.textCenter,
              AppStyles.textUpper,
              Styles.h1,
              AppStyles.textBold,
              AppStyles.textPrimary,
              AppStyles.marginBottomSm,
            ]}>
            {props.approved ? null : 'Not '}Approved
          </Text>
        </View>
        {props.proof ? (
          <ScrollView style={Styles.tableWrap}>
            <View style={Styles.tableHeader}>
              <Text
                style={[
                  Styles.headerText,
                  AppStyles.textBold,
                  AppStyles.textCenter,
                ]}>
                Happy Traveler Card
              </Text>
            </View>
            <View style={Styles.table}>
              <View style={Styles.tableItem}>
                <Text style={Styles.textItem}>
                  Issuer: {props.proof.issuer}
                </Text>
              </View>
            </View>
            <View style={Styles.table}>
              <View style={Styles.tableItem}>
                <Text style={Styles.textItem}>
                  Traveler ID: {props.proof.traveler_id}
                </Text>
              </View>
            </View>
            <View style={Styles.table}>
              <View style={Styles.tableItem}>
                <Text style={Styles.textItem}>
                  Card Created: {props.proof.trusted_date}
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : null}
      </View>
    </>
  )
}

export default Verified
